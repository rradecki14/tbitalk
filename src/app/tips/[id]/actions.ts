import { prisma } from "@/lib/prisma";

export async function reportTipAction(tipId: string) {
	"use server";
	try {
		await prisma.report.create({ data: { tipId, reason: "User reported" } });
		return { ok: true };
	} catch (e) {
		return { ok: false, error: "Unable to submit report" };
	}
}
