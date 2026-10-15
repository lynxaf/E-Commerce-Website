import React from 'react';
import FilterCheckboxItem from './filter-checkbox-items';

export default function FilterStock() {
    return (
        <div className="flex flex-col gap-[14px]">
                <p className="font-semibold leading-[22px]">Stocks</p>
                {/* <label className="font-semibold flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="stock"
                      className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
                    />
                    <span>Pre Order</span>
                </label>
                <label className="font-semibold flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="stock"
                      className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
                    />
                    <span>Ready Stock</span>
                </label> */}
                <FilterCheckboxItem id="pre-order" value="Pre Order" type="stock"/>
                <FilterCheckboxItem id="ready" value="Ready Stock" type="stock"/>
                
            </div>
    )
}