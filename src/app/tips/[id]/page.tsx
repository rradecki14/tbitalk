import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CommentForm from "./CommentForm";
import { addCommentAction } from "../../tips/new/actions";
import ReportButton from "./ReportButton";
import { reportTipAction } from "./actions";

interface TipPageProps {
  params: Promise<{ id: string }>;
}

export default async function TipPage({ params }: TipPageProps) {
  const { id } = await params;
  const tip = await prisma.tip.findUnique({
    where: { id },
    include: { comments: { orderBy: { createdAt: "desc" } } },
  });

  if (!tip || !tip.isPublished) {
    return (
      <div className="grid gap-4">
        <h1 className="text-2xl font-bold">Tip not found</h1>
        <Link className="text-blue-600 hover:underline" href="/tips">Back to tips</Link>
      </div>
    );
  }

  return (
    <article className="prose max-w-none">
      <h1>{tip.title}</h1>
      <p className="text-sm text-gray-500">{new Date(tip.createdAt).toLocaleString()}</p>
      <div className="whitespace-pre-wrap text-gray-800 mt-4">{tip.content}</div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Comments</h2>
        {tip.comments.length === 0 ? (
          <p className="text-gray-600">No comments yet.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {tip.comments.map((c) => (
              <li key={c.id} className="rounded-md border border-gray-200 p-3">
                <div className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
                <div className="mt-1">{c.content}</div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <CommentForm onSubmit={(formData) => addCommentAction(tip.id, formData)} />
        </div>
      </section>

      <div className="mt-8">
        <ReportButton action={() => reportTipAction(tip.id)} />
      </div>

      <div className="mt-6">
        <Link className="text-blue-600 hover:underline" href="/tips">← Back to tips</Link>
      </div>
    </article>
  );
}


