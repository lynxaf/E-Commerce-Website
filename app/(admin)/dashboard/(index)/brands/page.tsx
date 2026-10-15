import React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import { columns } from "./columns";
import { getBrands } from "./lib/data";

export default async function BrandsPage() {
	const data = await getBrands();
	return (
		<div className="space-y-4">
			<div className="text-right">
				<Link
					href="/dashboard/brands/create"
					className="inline-flex h-8 items-center justify-center gap-1 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
				>
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Add Brand
					</span>
				</Link>
			</div>
			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<CardTitle>Brands</CardTitle>
					<CardDescription>
						Manage your brands and view their sales performance.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable columns={columns} data={data} />
				</CardContent>
			</Card>
		</div>
	);
}

