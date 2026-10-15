"use client"

import { useCart } from "@/hooks/use-Cart"
import { TCart, TProduct } from "@/types"
import { useRouter } from "next/navigation"

interface HeroActionsProps {
    product: TProduct
}

export default function HeroActions({ product }: HeroActionsProps) {
    const router = useRouter()
    const { addProduct } = useCart()

    const addToCart = () => {
        const cartProduct: TCart = {
            ...product,
            quantity: 1,
        }

        addProduct(cartProduct)
        router.push("/carts")
    }

    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={addToCart}
                className="p-[18px_24px] rounded-full font-semibold bg-[#0D5CD7] text-white"
            >
                Add to Cart
            </button>
            <button
                type="button"
                onClick={() => router.push(`/detail-product/${product.id}`)}
                className="p-[18px_24px] rounded-full font-semibold bg-white"
            >
                View Details
            </button>
        </div>
    )
}
