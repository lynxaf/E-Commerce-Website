"use client";

import CardProduct from "../../_components/card-product.";
import { useFilter } from "@/hooks/useFilter";

type Product = {
    id: number;
    image_url: string;
    name: string;
    category: {
        name: string;
    };
    brand: {
        name: string;
    };
    price: bigint | number;
};

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    const search = useFilter((state) => state.filter.search.trim().toLowerCase());
    const filteredProducts = products.filter((product) =>
        `${product.name} ${product.brand.name} ${product.category.name}`.toLowerCase().includes(search)
    );

    return (
        <div className="grid grid-cols-3 gap-[30px]">
            {filteredProducts.map((product) => (
                <CardProduct key={product.id} item={{
                    category_name: product.category.name,
                    id: product.id,
                    image_url: product.image_url,
                    name: product.name,
                    price: Number(product.price)
                }} />
            ))}
            {filteredProducts.length === 0 && (
                <p className="col-span-full text-center text-[#616369]">
                    Produk tidak ditemukan.
                </p>
            )}
        </div>
    )
}