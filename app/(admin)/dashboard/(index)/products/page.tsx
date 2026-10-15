import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { columns } from './column';
import { getProducts } from './lib/data';

export default async function ProductPage() {
	const products = await getProducts()

    return (
			<div className="space-y-4">
			<div className="text-right">
				<Link
					href="/dashboard/products/create"
					className="inline-flex h-8 items-center justify-center gap-1 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
				>
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Add Products
					</span>
				</Link>
			</div>
			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<CardTitle>Products</CardTitle>
					<CardDescription>
						Manage your products and view their sales performance.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable columns={columns} data={products} />
				</CardContent>
			</Card>
		</div>
	);
}
