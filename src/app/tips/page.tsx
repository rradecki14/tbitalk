import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function TipsPage() {
  const tips = await prisma.tip.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true },
  });

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Healing Tips</h1>
      {tips.length === 0 ? (
        <p className="text-gray-600">No tips yet. Be the first to share one!</p>
      ) : (
        <ul className="grid gap-4">
          {tips.map((tip) => (
            <li key={tip.id} className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
              <Link href={`/tips/${tip.id}`} className="font-medium hover:underline">
                {tip.title}
              </Link>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(tip.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


