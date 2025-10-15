"use client";

import { useTransition, useState } from "react";

export default function ReportButton({ action }: { action: () => Promise<{ ok: boolean; error?: string }>; }) {
	const [pending, startTransition] = useTransition();
	const [msg, setMsg] = useState<string | null>(null);
	return (
		<div className="flex items-center gap-3">
			<button
				disabled={pending}
				onClick={() => {
					setMsg(null);
					startTransition(async () => {
						const res = await action();
						if (!res.ok) setMsg(res.error || "Failed to report");
						else setMsg("Reported. Thank you.");
					});
				}}
				className="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
			>
				{pending ? "Reporting..." : "Report content"}
			</button>
			{msg && <span className="text-sm text-gray-600">{msg}</span>}
		</div>
	);
}
