import React from "react";
import Navbar from "../_components/navbar";
import SearchBarPage from "./_components/search-bar";
import FilterPrice from "./_components/filter-price";
import FilterStock from "./_components/filter-stock";
import FilterBrands from "./_components/filter-brands";
import FilterLocation from "./_components/filter-location";
import FilterCategories from "./_components/filter-categories";
import ProductList from "./_components/product-list";
import { getProducts } from "../lib/data";

export default async function CatalogsPage() {
    const products = (await getProducts()).map((product) => ({
        ...product,
        price: Number(product.price)
    }));

    return (
        <>
        <div>
           <header className="bg-[#EFF3FA] pt-[30px] h-[351px] -mb-[181px]">
        <Navbar />
          </header>
         <SearchBarPage />   
            <div id="catalog" className="container max-w-[1130px] mx-auto flex gap-[30px] mt-[50px] pb-[100px]">
        <form action="" className="flex flex-1 flex-col bg-white p-[30px] gap-5 h-fit border border-[#E5E5E5] rounded-[30px]">
            <h2 className="font-bold text-2xl leading-[34px]">Filters</h2>
            <FilterPrice />
            <hr className="border-[#E5E5E5]" />
            <FilterStock />
            <hr className="border-[#E5E5E5]" />
            <FilterBrands />
            <hr className="border-[#E5E5E5]" />
            <FilterLocation />
            <hr className="border-[#E5E5E5]" />
            <FilterCategories />
        </form>
        <div className="w-[780px] flex flex-col bg-white p-[30px] gap-[30px] h-fit border border-[#E5E5E5] rounded-[30px]">
            <h2 className="font-bold text-2xl leading-[34px]">Products</h2>
            <ProductList products={products} />
        </div>
    </div>
       </div>
        </>
    )
}