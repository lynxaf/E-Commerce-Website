import { TFilter } from "@/hooks/useFilter";
import { TProduct } from "@/types";

export async function fetchProduct(body?: TFilter): Promise<TProduct[]> {
    const res = await fetch("/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {})
    })
    const payload = await res.json()
    if (!res.ok || !payload.success) {
        throw new Error(payload.error ?? "Failed to load products")
    }
    return payload.data
}