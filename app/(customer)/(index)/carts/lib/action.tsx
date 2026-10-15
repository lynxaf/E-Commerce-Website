"use server"

import { getUser } from "@/lib/auth";
import { schemaShippingAddress } from "@/lib/schema";
import { ActionResult, TCart } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../lib/prisma";
import { generateRandomString } from "@/lib/utils";
import { PaymentRequestParameters, PaymentRequest } from "xendit-node/payment_request/models";
import xenditClient from "@/lib/xendit";

export async function storeOrder(
    _: unknown,
    formData: FormData,
    products: TCart[]
): Promise<ActionResult> {

    const {session, user} = await getUser()

    if (!session) {
        return redirect('/')
    }

    const parse = schemaShippingAddress.safeParse({
        name: formData.get('name'),
        address: formData.get('address'),
        city: formData.get('city'),
        postal_code: formData.get('postal_code'),
        notes: formData.get('notes'),
        phone: formData.get('phone'),
    })

    if (!parse.success) {
        return {
            error: parse.error.errors[0].message
        }
    }

    if (products.length === 0) {
        return { error: "Your cart is empty" }
    }

    let redirectPaymentUrl = '/'

    try {
        const requestedItems = products.map((product) => ({
            id: product.id,
            quantity: Number.isInteger(product.quantity) ? product.quantity : 0,
        }))
        if (requestedItems.some((item) => item.quantity < 1 || item.quantity > 99)) {
            return { error: "Invalid cart quantity" }
        }

        const databaseProducts = await prisma.product.findMany({
            where: { id: { in: requestedItems.map((item) => item.id) } },
            select: { id: true, price: true, stock: true },
        })
        if (databaseProducts.length !== requestedItems.length) {
            return { error: "One or more products are unavailable" }
        }

        const productById = new Map(databaseProducts.map((product) => [product.id, product]))
        const total = requestedItems.reduce((sum, item) => {
            const product = productById.get(item.id)
            if (!product || product.stock !== "ready") {
                throw new Error("One or more products are unavailable")
            }
            return sum + Number(product.price) * item.quantity
        }, 0)
        const order = await prisma.$transaction(async (tx) => {
            const createdOrder = await tx.order.create({
                data: {
                    total,
                    status: 'pending',
                    user_id: user.id,
                    code: generateRandomString(15)
                }
            })
            await tx.orderProduct.createMany({
                data: requestedItems.map((item) => {
                    const price = productById.get(item.id)!.price
                    return {
                        order_id: createdOrder.id,
                        product_id: item.id,
                        quantity: item.quantity,
                        unit_price: price,
                        subtotal: price * BigInt(item.quantity),
                    }
                })
            })
            await tx.orderDetail.create({
                data: {
                    address: parse.data.address,
                    city: parse.data.city,
                    name: parse.data.name,
                    phone: parse.data.phone,
                    postal_code: parse.data.postal_code,
                    notes: parse.data.notes,
                    order_id: createdOrder.id
                }
            })
            return createdOrder
        })

        const data: PaymentRequestParameters = {
            amount: total,
            paymentMethod: {
                ewallet: {
                    channelProperties: {
                        successReturnUrl: process.env.NEXT_PUBLIC_REDIRECT_URL
                    },
                    channelCode: 'SHOPEEPAY'
                },
                reusability: "ONE_TIME_USE",
                type: "EWALLET"
            },
            currency: "IDR",
            referenceId: order.code
        }

        const response: PaymentRequest = await xenditClient().PaymentRequest.createPaymentRequest({
            data
        })

        redirectPaymentUrl = response.actions?.find((val) => val.urlType === "DEEPLINK")?.url ?? "/"

    } catch (error) {
        console.error("Checkout failed", error);
        return {
            error: "Failed to checkout"
        }
    }

    return redirect(redirectPaymentUrl)
}