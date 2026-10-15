import React from "react";
import { getCategoryById, getLocationById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/form-category";

type Tparams = {
	id: string;
};

interface EditPageProp {
	params: Promise<Tparams>;
}

export default async function EditPage({ params }: EditPageProp) {
	const { id } = await params;
	const data = await getLocationById(id);

	if (!data) {
		return redirect("/dashboard/locations");
	}

	return <FormCategory type="EDIT" data={data} />;
}
