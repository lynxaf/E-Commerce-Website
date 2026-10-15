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
import { getLocations } from "./lib/data";

export default async function LocationsPage() {
	const data = await getLocations();
	return (
		<div className="space-y-4">
			<div className="text-right">
				<Link
					href="/dashboard/locations/create"
					className="inline-flex h-8 items-center justify-center gap-1 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
				>
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Add Location
					</span>
				</Link>
			</div>
			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<CardTitle>Locations</CardTitle>
					<CardDescription>
						Manage your locations and view their sales performance.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable columns={columns} data={data} />
				</CardContent>
			</Card>
		</div>
	);
}

