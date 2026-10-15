import { Tedit } from "@/types";
import React from "react";
import FormBrand from "../../_components/form-brand";
import { getBrandById } from "../../lib/data";

export default async function EditBrandPage({params} : Tedit) {
    const { id } = await params
    const brand = await getBrandById(id);

	return <FormBrand data={brand} />
}
