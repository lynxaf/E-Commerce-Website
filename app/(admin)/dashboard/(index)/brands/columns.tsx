"use client";

import { Button } from "@/components/ui/button";
import { Brand } from "@prisma/client";
import {
	ColumnDef
} from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/lib/supabase";
import FormDelete from "./_components/form-delete";


export const columns: ColumnDef<Brand, unknown>[] = [
	{
		accessorKey: "name",
		header: "Brand Name",
		cell: ({ row }) => {
			const brand = row.original;

			return (
				<div className="inline-flex items-center gap-5">
					<img src={getImageUrl(brand.logo, 'brands')}
						alt="Brand"
						width={80}
						height={80} />
					<span>{brand.name}</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const brand = row.original;

			return (
				<div className="space-x-4 inline-flex">
					<Link
						href={`/dashboard/brands/edit/${brand.id}`}
						className="inline-flex h-7 items-center justify-center gap-1 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground hover:bg-primary/80"
					>
						<Edit className="w-4 h-4" /> Edit
					</Link>
					<FormDelete id={brand.id} />
				</div>
			);
		},
	},
];
