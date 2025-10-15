export default function Home() {
  return (
    <div className="grid gap-10">
      <section className="flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="block" style={{ color: "#1e66ff" }}>TBITalk.com</span>
          <span className="block text-gray-800">Healing together through shared tips</span>
        </h1>
        <p className="max-w-2xl text-gray-600">
          A community for traumatic brain injury survivors, caregivers, clinicians, and researchers.
          Share what’s helped you recover—so we can help each other heal.
        </p>
        <div className="flex items-center gap-4">
          <a href="/tips" className="inline-flex items-center rounded-md bg-gray-900 text-white px-5 py-3 text-sm font-medium hover:bg-gray-800">
            Explore Tips
          </a>
          <a href="#contribute" className="inline-flex items-center rounded-md border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50">
            Contribute a Tip
          </a>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        <div className="rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold mb-2">For Patients</h3>
          <p className="text-sm text-gray-600">Find practical tips others used for sleep, focus, headaches, and more.</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold mb-2">For Caregivers</h3>
          <p className="text-sm text-gray-600">Learn routines and tools that support day‑to‑day recovery.</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold mb-2">For Pros & Researchers</h3>
          <p className="text-sm text-gray-600">See what’s working in the real world and help validate community insights.</p>
        </div>
      </section>

      <section id="contribute" className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Share a healing tip</h2>
        <p className="text-sm text-gray-600 mb-4">Post a brief description of what helped and why. Coming soon.</p>
        <a className="inline-flex items-center rounded-md bg-gray-900 text-white px-5 py-3 text-sm font-medium opacity-60 cursor-not-allowed" aria-disabled="true">
          Submission opens after auth setup
        </a>
      </section>
    </div>
  );
}
