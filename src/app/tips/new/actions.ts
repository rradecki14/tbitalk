export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export async function createTipAction(formData: FormData) {
	"use server";
	const title = String(formData.get("title") || "").trim();
	const content = String(formData.get("content") || "").trim();
	if (!title || !content) {
		return { ok: false, error: "Title and content are required." };
	}
	const session = await auth();
	let authorConnect:
		| { connect: { id: string } }
		| { create: { email: string; name?: string | null } };
	if (session?.user?.id) {
		authorConnect = { connect: { id: session.user.id } };
	} else {
		authorConnect = { create: { email: `anon-${Date.now()}@example.com`, name: "Anonymous" } };
	}
	const tip = await prisma.tip.create({
		data: {
			title,
			content,
			isPublished: true,
			author: authorConnect,
		},
	});
	return { ok: true, id: tip.id };
}

export async function addCommentAction(tipId: string, formData: FormData) {
	"use server";
	const content = String(formData.get("content") || "").trim();
	if (!content) {
		return { ok: false, error: "Comment cannot be empty." };
	}
	const session = await auth();
	let authorConnect:
		| { connect: { id: string } }
		| { create: { email: string; name?: string | null } };
	if (session?.user?.id) {
		authorConnect = { connect: { id: session.user.id } };
	} else {
		authorConnect = { create: { email: `anon-${Date.now()}@example.com`, name: "Anonymous" } };
	}
	await prisma.comment.create({
		data: {
			content,
			tip: { connect: { id: tipId } },
			author: authorConnect,
		},
	});
	return { ok: true };
}
