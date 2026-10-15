import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

// Field angka (ID, harga) yang dikirim sebagai string dari form
const numField = (label: string) =>
	z
		.string({ required_error: `${label} is required` })
		.regex(/^\d+$/, { message: `${label} is required` });

export const schemaSignIn = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email is not valid" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(5, { message: "Password should have min 5 characters" }),
});

export const schemaCategory = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(4, { message: "Name should have min 4 characters" }),
});

export const schemaSignUp = schemaSignIn.extend({
	name: z
		.string({ required_error: "Name is required" })
		.min(4, { message: "Name should have min 4 characters" }),
});

export const schemaBrand = schemaCategory.extend({
	image: z
		.any()
		.refine((file: File) => ALLOW_MIME_TYPES.includes(file?.type), {
			message: "File is not valid",
		})
		.refine((file: File) => file?.name, { message: "Image is required" }),
});

export const schemaProduct = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(4, { message: "Name should have min 4 characters" }),
	description: z
		.string({ required_error: "Description is required" })
		.min(10, { message: "Description should have min 10 characters" }),
	price: numField("Price"),
	stock: z.enum(["ready", "preorder"], {
		errorMap: () => ({ message: "Stock status is required" }),
	}),
	brand_id: numField("Brand"),
	category_id: numField("Category"),
	location_id: numField("Location"),
	images: z
		.any()
		.refine((files: File[]) => files?.length === 3, {
			message: "Please upload 3 image product",
		})
		.refine(
			(files: File[]) =>
				Array.from(files ?? []).every((file) =>
					ALLOW_MIME_TYPES.includes(file.type)
				),
			{
				message: "Uploaded file should image",
			}
		),
});

export const schemaProductEdit = schemaProduct
	.extend({
		id: z.number({ required_error: "Product Id is required" }),
	})
	.omit({ images: true });

export const schemaShippingAddress = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(5, { message: "Name should have 5 minimal characters" }),
	address: z
		.string({ required_error: "Address is required" })
		.min(5, { message: "Address should have 5 minimal characters" }),
	city: z
		.string({ required_error: "City is required" })
		.min(5, { message: "City should have 5 minimal characters" }),
	postal_code: z
		.string({ required_error: "Postal Code is required" })
		.min(5, { message: "Postal Code should have 5 minimal characters" }),
	notes: z.string().max(255).default(""),
	phone: z
		.string({ required_error: "Phone is required" })
		.min(5, { message: "Phone should have 5 minimal characters" }),
});