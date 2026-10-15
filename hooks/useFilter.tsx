import { productStock } from "@prisma/client";
import { create } from "zustand";

export type TFilter = {
    search: string;
    minPrice: number;
    maxPrice: number;
    stock?: productStock[] | null;
    brand?: number[] | null;
    category?: number[] | null;
    location?: number[] | null;
}

export interface FilterState {
    filter: TFilter;
    setFilter: (filter: Partial<TFilter>) => void;
}

export const useFilter = create<FilterState>()((set) => ({
    filter: {
        search: "",
        minPrice: 0,
        maxPrice: 1000,
        stock: null,
        brand: null,
        category: null,
        location: null
    },
    setFilter: (filter) => set((state) => ({ 
        filter: {
            ...state.filter,
            ...filter
        }
    }))
}));
