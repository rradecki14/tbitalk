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

      <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">New game concept</p>
          <h2 className="text-3xl font-bold text-gray-900">EchoTrace</h2>
          <p className="text-lg text-gray-600">Remember forward, not backward.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              EchoTrace is designed for short-term memory recovery by training anticipation instead of static recall. Players
              experience brief, everyday moments without being told to memorize, then reconstruct what comes next after a
              short interruption.
            </p>
            <ul className="grid gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <li className="font-semibold text-gray-900">Core loop</li>
              <li>Experience a 6–15 second scene (audio, visual, or mixed).</li>
              <li>Pause for a short, calming interruption.</li>
              <li>Rebuild what happens next or what changed.</li>
            </ul>
            <p>
              Instead of scores, the game tracks a Memory Stability Index, recovery speed, and prediction accuracy to keep
              progress personal and encouraging.
            </p>
          </div>
          <div className="space-y-5 rounded-xl border border-gray-100 bg-gray-50 p-5 text-sm text-gray-700">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Memory channels trained</h3>
              <ul className="mt-3 grid gap-2">
                <li>Sequential ordering</li>
                <li>Working memory &amp; manipulation</li>
                <li>Auditory rhythm and tone</li>
                <li>Visual-spatial object shifts</li>
                <li>Emotional intent and mood</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Adaptive by design</h3>
              <p className="mt-2">
                Scenes shorten, pacing slows, or audio/visual modes switch automatically based on fatigue and stress signals.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Mini-modes</h3>
              <ul className="mt-3 grid gap-2">
                <li>Sound Footsteps (predict the next sound)</li>
                <li>Room Shift (restore the room based on feel)</li>
                <li>Echo Conversation (choose the emotional direction)</li>
              </ul>
            </div>
          </div>
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
