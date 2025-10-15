import { prisma } from "@/lib/prisma";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export default async function ReportsAdminPage() {
	const session = await auth();
	if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
		return <div>Not authorized.</div>;
	}
	const reports = await prisma.report.findMany({
		orderBy: { createdAt: "desc" },
		include: { tip: { select: { id: true, title: true } } },
	});
	async function setStatus(id: string, status: "OPEN" | "REVIEWING" | "RESOLVED" | "REJECTED") {
		"use server";
		await prisma.report.update({ where: { id }, data: { status } });
	}
	return (
		<div className="grid gap-6">
			<h1 className="text-2xl font-bold">Reports</h1>
			{reports.length === 0 ? (
				<p className="text-gray-600">No reports.</p>
			) : (
				<ul className="space-y-4">
					{reports.map((r) => (
						<li key={r.id} className="rounded-md border border-gray-200 p-4">
							<div className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
							<div className="font-medium">Tip: {r.tip.title}</div>
							<div className="text-sm">Reason: {r.reason}</div>
							<div className="text-sm">Status: {r.status}</div>
							<div className="mt-3 flex gap-2">
								<form action={async () => setStatus(r.id, "REVIEWING")}><button className="px-3 py-1 border rounded">Reviewing</button></form>
								<form action={async () => setStatus(r.id, "RESOLVED")}><button className="px-3 py-1 border rounded">Resolved</button></form>
								<form action={async () => setStatus(r.id, "REJECTED")}><button className="px-3 py-1 border rounded">Reject</button></form>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
