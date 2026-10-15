import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { TProduct } from "@/types";
import { getImageUrl } from "@/lib/supabase";
import { z } from "zod";

const catalogSchema = z.object({
    search: z.string().trim().max(100).default(""),
    minPrice: z.coerce.number().int().min(0).optional(),
    maxPrice: z.coerce.number().int().min(0).optional(),
    stock: z.array(z.enum(["ready", "preorder"])).max(2).optional().nullable(),
    brand: z.array(z.coerce.number().int().positive()).max(50).optional().nullable(),
    category: z.array(z.coerce.number().int().positive()).max(50).optional().nullable(),
    location: z.array(z.coerce.number().int().positive()).max(50).optional().nullable(),
    page: z.coerce.number().int().min(1).max(10000).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(24),
});

export async function POST(request: Request) {
    try {
        const parsed = catalogSchema.safeParse(await request.json())
        if (!parsed.success) {
            return Response.json({ success: false, error: "Invalid catalog filters" }, { status: 400 })
        }
        const res = parsed.data
        const filters: Prisma.ProductWhereInput[] = []

        if (res.search && res.search !== "") {
            filters.push({
                name: {
                    contains: res.search,
                    mode: 'insensitive'
                }
            })
        }

        if (res.minPrice && res.minPrice > 0) {
            filters.push({
                price: {
                    gte: res.minPrice
                }
            })
        }

        if (res.maxPrice && res.maxPrice > 0) {
            filters.push({
                price: {
                    lte: res.maxPrice
                }
            })
        }

        if (res.stock && res.stock.length > 0) {
            filters.push({
                stock: {
                    in: res.stock
                }
            })
        }

        if (res.brand && res.brand.length > 0) {
            filters.push({
                brand: {
                    id: {
                        in: res.brand
                    }
                }
            })
        }

        if (res.category && res.category.length > 0) {
            filters.push({
                category: {
                    id: {
                        in: res.category
                    }
                }
            })
        }

        if (res.location && res.location.length > 0) {
            filters.push({
                location: {
                    id: {
                        in: res.location
                    }
                }
            })
        }
        

        const products = await prisma.product.findMany({
            where: {
                AND: filters.length > 0 ? filters : undefined
            },
            select: {
                id: true,
                images: true,
                name: true,
                category: {
                    select: {
                        name: true
                    }
                },
                price: true
            },
            skip: (res.page - 1) * res.limit,
            take: res.limit,
        })
        

        const response: TProduct[] = products.map((product) => {
            return {
                id: product.id,
                category_name: product.category.name,
                image_url: getImageUrl(product.images[0], 'products'),
                name: product.name,
                price: Number(product.price)
            }
        })

        return Response.json({ success: true, data: response, page: res.page, limit: res.limit })

    } catch (error) {
        console.error("Catalog request failed", error);
        return Response.json({ success: false, error: "Failed to load catalog" }, {status: 500})
    }
}