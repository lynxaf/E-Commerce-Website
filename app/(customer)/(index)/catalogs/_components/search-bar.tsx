"use client"

import { useFilter } from '@/hooks/useFilter'
import React, { FormEvent, useEffect, useState } from 'react'

export default function SearchBar() {
    const {setFilter} = useFilter()
    const [query, setQuery] = useState<string>("")

    useEffect(() => {
        const debounceInput = setTimeout(() => {
            setFilter({ search: query })
        }, 300)

        return () => clearTimeout(debounceInput)
    }, [query, setFilter])

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setFilter({ search: query })
    }

  return (
    <div id="title" className="container max-w-[1130px] mx-auto flex items-center justify-between">
        <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center">
                <a className="page text-sm text-[#6A7789] last-of-type:text-black">Shop</a>
                <span className="text-sm text-[#6A7789]">/</span>
                <a className="page text-sm text-[#6A7789] last-of-type:text-black">Browse</a>
                <span className="text-sm text-[#6A7789]">/</span>
                <a className="page text-sm text-[#6A7789] last-of-type:text-black">Catalog</a>
            </div>
            <h1 className="font-bold text-4xl leading-9">Our Product Catalog</h1>
        </div>
        <form onSubmit={handleSubmit} className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black" placeholder="Search product by name, brand, category" />
            <button type="submit" className="flex shrink-0">
                <img src="/assets/icons/search-normal.svg" alt="Search" />
            </button>
        </form>
    </div>
  )
}
