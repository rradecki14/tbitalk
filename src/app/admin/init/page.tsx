import { prisma } from "@/lib/prisma";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export default async function InitAdminPage() {
	const session = await auth();
	if (!session?.user?.id) {
		return <div>Please sign in to continue.</div>;
	}

	const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
	if (adminCount > 0) {
		return <div>An admin already exists. Ask an admin to grant you access.</div>;
	}

	async function promote() {
		"use server";
		await prisma.user.update({ where: { id: session.user!.id }, data: { role: "ADMIN" } });
	}

	return (
		<div className="max-w-lg">
			<h1 className="text-2xl font-bold mb-4">Initialize Admin</h1>
			<p className="text-gray-600 mb-4">
				No admin users exist yet. Promote your current account to ADMIN to manage the site.
			</p>
			<form action={promote}>
				<button className="inline-flex items-center rounded-md bg-gray-900 text-white px-5 py-3 text-sm font-medium hover:bg-gray-800">
					Make me ADMIN
				</button>
			</form>
		</div>
	);
}


