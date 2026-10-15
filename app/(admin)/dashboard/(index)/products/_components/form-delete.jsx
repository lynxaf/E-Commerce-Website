"use client";

import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteProduct } from "../lib/actions";
import { useActionState } from 'react';

const initialState = {
  message: '',
  errors: {},
};


function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			variant="destructive"
			size="sm"
			disabled={pending}
		>
			<Trash className="w-4 h-4 mr-2" />{" "}
			{pending ? "Loading..." : "Delete"}
		</Button>
	);
}

export default function FormDelete({ id }) {
	const deleteCategoryWithId = (_, formData) =>
		deleteProduct(_, _, id);

	const [state, formAction] = useFormState(
		deleteCategoryWithId,
		initialState
	);

	return (
		<form action={formAction}>
			<SubmitButton />
		</form>
	);
}
