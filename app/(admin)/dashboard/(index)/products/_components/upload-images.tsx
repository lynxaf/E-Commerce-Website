"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Upload, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

const PLACEHOLDER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><rect width='18' height='18' x='3' y='3' rx='2' ry='2'/><circle cx='9' cy='9' r='2'/><path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/></svg>";

export default function UploadImages() {
	// State array menyimpan File atau string preview per slot
	const [images, setImages] = useState<(File | null)[]>([null, null, null]);
	const [previews, setPreviews] = useState<string[]>(["", "", ""]);
	
	// Ref untuk mentrigger input file slot spesifik
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	// 1. Pilih/Ganti gambar pada slot tertentu (index)
	const handleSelectImage = (index: number, e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const newImages = [...images];
		const newPreviews = [...previews];

		newImages[index] = file;
		newPreviews[index] = URL.createObjectURL(file);

		setImages(newImages);
		setPreviews(newPreviews);
	};

	// 2. Tambah slot gambar baru jika ingin lebih dari 3
	const handleAddSlot = () => {
		setImages((prev) => [...prev, null]);
		setPreviews((prev) => [...prev, ""]);
	};

	// 3. Hapus slot/gambar (jika total slot > 3)
	const handleRemoveSlot = (index: number) => {
		if (images.length <= 3) {
			// Jika slot 1-3, cukup reset slot tersebut jadi kosong (bukan dihapus slot-nya)
			const newImages = [...images];
			const newPreviews = [...previews];
			newImages[index] = null;
			newPreviews[index] = "";
			setImages(newImages);
			setPreviews(newPreviews);
			return;
		}

		// Jika slot > 3, hapus slot tersebut dari array
		setImages((prev) => prev.filter((_, i) => i !== index));
		setPreviews((prev) => prev.filter((_, i) => i !== index));
	};

	// Hitung total gambar yang terisi
	const uploadedCount = images.filter((img) => img !== null).length;
	const isMinimumReached = uploadedCount >= 3;

	return (
		<Card className="overflow-hidden">
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
				<CardDescription>
					Unggah minimal 3 foto produk ({uploadedCount}/3 terisi)
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					{!isMinimumReached && (
						<p className="text-xs font-medium text-destructive">
							* Wajib mengunggah minimal 3 foto produk sebelum menyimpan.
						</p>
					)}

					{/* Gambar Utama / Thumbnail (Slot 0) */}
					<div className="relative aspect-square w-full rounded-md overflow-hidden border group">
						<Image
							alt="Product thumbnail"
							className="aspect-square w-full rounded-md object-cover"
							height="300"
							src={previews[0] || PLACEHOLDER}
							width="300"
							unoptimized={!!previews[0]}
						/>
						<button
							type="button"
							onClick={() => inputRefs.current[0]?.click()}
							className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-medium gap-1"
						>
							<Upload className="h-4 w-4" />
							{previews[0] ? "Ganti Utama" : "Pilih Gambar Utama"}
						</button>
						<input
							type="file"
							name="images"
							accept="image/*"
							className="hidden"
							ref={(el) => { inputRefs.current[0] = el; }}
							onChange={(e) => handleSelectImage(0, e)}
						/>
					</div>

					{/* Grid Gambar Tambahan (Slot 1, 2, dst) */}
					<div className="grid grid-cols-3 gap-2">
						{images.slice(1).map((_, idx) => {
							const realIndex = idx + 1; // offset karena slot 0 adalah thumbnail
							return (
								<div
									key={realIndex}
									className="relative aspect-square w-full rounded-md overflow-hidden border group flex items-center justify-center bg-muted/20"
								>
									<Image
										alt={`Product image ${realIndex}`}
										className="aspect-square w-full rounded-md object-cover"
										height="84"
										src={previews[realIndex] || PLACEHOLDER}
										width="84"
										unoptimized={!!previews[realIndex]}
									/>

									{/* Overlay Tombol Pilih/Ganti */}
									<button
										type="button"
										onClick={() => inputRefs.current[realIndex]?.click()}
										className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-medium gap-1 text-center p-1"
									>
										{previews[realIndex] ? "Ganti" : "Pilih"}
									</button>

									{/* Tombol Hapus jika gambar terisi */}
									{previews[realIndex] && (
										<button
											type="button"
											onClick={() => handleRemoveSlot(realIndex)}
											className="absolute top-1 right-1 bg-destructive text-white rounded-full p-0.5 z-10"
										>
											<X className="h-3 w-3" />
										</button>
									)}

									<input
										type="file"
										name="images"
										accept="image/*"
										className="hidden"
										ref={(el) => { inputRefs.current[realIndex] = el; }}
										onChange={(e) => handleSelectImage(realIndex, e)}
									/>
								</div>
							);
						})}

						{/* Tombol Tambah Slot Gambar Baru (> 3) */}
						<button
							type="button"
							onClick={handleAddSlot}
							className="flex aspect-square w-full flex-col items-center justify-center rounded-md border border-dashed hover:bg-accent transition-colors gap-1 text-muted-foreground"
						>
							<Plus className="h-5 w-5" />
							<span className="text-[10px]">Tambah Gambar</span>
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}