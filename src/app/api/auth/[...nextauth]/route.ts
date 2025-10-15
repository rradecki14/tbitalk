import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Google,
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				const user = await prisma.user.findUnique({ where: { email: credentials.email } });
				if (!user || !user.passwordHash) return null;
				const ok = await bcrypt.compare(credentials.password, user.passwordHash);
				if (!ok) return null;
				return { id: user.id, email: user.email, name: user.name || null } as any;
			},
		}),
	],
	callbacks: {
		session: async ({ session, token, user }) => {
			if (session.user && user) {
				session.user.id = user.id;
				session.user.role = (user as any).role;
			}
			return session;
		},
	},
	pages: {
		signIn: "/signin",
	},
	session: { strategy: "database" },
	trustHost: true,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
