import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, type Session, type User } from "lucia";
import prisma from "./prisma";
import { RoleUser } from "@prisma/client";
import { cache } from "react";
import { cookies as nextCookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
        expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes) => {
		const userAttributes = attributes as {
			id: number;
			name: string;
			email: string;
			role: RoleUser;
		};
		return {
			id: userAttributes.id,
			name: userAttributes.name,
			email: userAttributes.email,
			role: userAttributes.role,
		};
	},
});

export const getUser = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const cookieStore = await cookies();
		const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch (error) {
			if (process.env.NODE_ENV !== "production") {
				console.warn("Unable to refresh session cookie", error);
			}
		}
		return result;
	}
);

export async function requireSuperadmin() {
	const result = await getUser();
	if (!result.session || !result.user || (result.user as User & { role: RoleUser }).role !== "superadmin") {
		throw new Error("Unauthorized");
	}
	return result;
}

declare module "lucia" {
	interface Register {
		LuciaAuth: typeof lucia;
		UserId : number;
		DatabaseAttributes: {
			user: {
				id: number;
				name : string,
				email : string,
				role : RoleUser,
			};
		};	
	}	
}

function cookies() {
	return nextCookies();
}
