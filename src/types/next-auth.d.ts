import NextAuth from "next-auth";

declare module "next-auth" {
	export interface Session {
		user: {
			id: string;
			name: string | null;
			email: string | null;
			image?: string | null;
			role?: "MEMBER" | "MODERATOR" | "ADMIN";
		};
	}

	export interface User {
		id: string;
		role?: "MEMBER" | "MODERATOR" | "ADMIN";
	}
}
