"use client";

import { useState, useTransition } from "react";

type Props = {
  onSubmit: (formData: FormData) => Promise<{ ok: boolean; error?: string } | void>;
};

export default function CommentForm({ onSubmit }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        setError(null);
        startTransition(async () => {
          const res = (await onSubmit(formData)) as { ok: boolean; error?: string } | void;
          if (res && !res.ok) setError(res.error || "Something went wrong");
          if (!res || res.ok) form.reset();
        });
      }}
      className="grid gap-3"
    >
      <textarea name="content" rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Share your thoughts" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={pending} className="inline-flex items-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 w-fit">
        {pending ? "Posting..." : "Post comment"}
      </button>
    </form>
  );
}


