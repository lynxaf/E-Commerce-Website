"use client";

import { Button } from "@/components/ui/button";
import { Location } from "@prisma/client";
import {
	ColumnDef
} from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/form-delete";


export const columns: ColumnDef<Location, unknown>[] = [
	{
		accessorKey: "name",
		header: "Location Name",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const category = row.original;

			return (
				<div className="space-x-4 inline-flex">
					<Link
						href={`/dashboard/locations/edit/${category.id}`}
						className="inline-flex h-7 items-center justify-center gap-1 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground hover:bg-primary/80"
					>
						<Edit className="w-4 h-4" /> Edit
					</Link>
					<FormDelete id={category.id} />
				</div>
			);
		},
	},
];
