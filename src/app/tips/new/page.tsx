import { createTipAction } from "./actions";
import { redirect } from "next/navigation";

export default function NewTipPage() {
  async function action(formData: FormData) {
    "use server";
    const res = await createTipAction(formData);
    if (res.ok && res.id) {
      redirect(`/tips/${res.id}`);
    }
    return res;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Share a healing tip</h1>
      <form action={action} className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
          <input id="title" name="title" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Describe the tip in one line" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="content">Details</label>
          <textarea id="content" name="content" rows={6} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="What helped? How to do it? Any caveats?" />
        </div>
        <button type="submit" className="inline-flex items-center rounded-md bg-gray-900 text-white px-5 py-3 text-sm font-medium hover:bg-gray-800 w-fit">Publish Tip</button>
      </form>
    </div>
  );
}


