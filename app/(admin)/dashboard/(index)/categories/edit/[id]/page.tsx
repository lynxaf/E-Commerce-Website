import React from "react";
import { getCategoryById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/form-category";

type Tparams = {
	id: string;
};

export type Tedit = {
	params : Tparams
};

interface EditPageProp {
	params: Promise<Tparams>;
}

export default async function EditPage({ params }: EditPageProp) {
	const { id } = await params;
	const data = await getCategoryById(id);

	if (!data) {
		return redirect("/dashboard/categories");
	}

	return <FormCategory type="EDIT" data={data} />;
}
