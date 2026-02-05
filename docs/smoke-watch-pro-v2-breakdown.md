# Smoke-Watch Pro v2.0 — Comprehensive Breakdown (Continued)

## 1. Executive Summary
Smoke-Watch Pro is a forensic video analysis tool designed to automatically detect smoking behaviors in surveillance footage. It solves the problem of having to watch hours of video manually.

Instead of watching the whole video, the user uploads a file, and the system outputs a “Supercut” (Evidence Clip) containing only the specific moments where smoking occurred, verified by Artificial Intelligence.

## 2. Architecture Overview
The application uses a Cascade Architecture (filtering data from fast/cheap to slow/smart) and an Asynchronous Job System.

- **Frontend (UI):** A single-page “Command Center” dashboard (HTML/JS/Tailwind).
- **Web Server:** FastAPI (Python) handles uploads and serves the UI.
- **The Engine:** A background worker process that runs the computer vision pipeline.
- **The Filter (Level 1):** MediaPipe (Fast geometric analysis).
- **The Judge (Level 2):** Gemini 1.5 Flash (AI Visual Verification).

## 3. The 5-Step Analysis Pipeline
When a user uploads a video, the backend kicks off a background task that follows these exact steps:

### Step 1: Frame Extraction (FFmpeg)
- **The Problem:** AI models cannot “watch” video in real-time efficiently; they process individual images.
- **The Solution:** The app uses ffmpeg to break the video into a sequence of images.
- **Optimization:** It extracts frames at **4 FPS**. We don’t need 30 or 60 FPS to detect a smoking motion; 4 FPS is enough to catch the gesture while reducing processing time by ~85%.

### Step 2: Heuristic Scanning (MediaPipe)
- **The Goal:** Quickly find “suspect” moments without costing money or heavy compute.
- **The Tech:** Google’s MediaPipe (Face Mesh + Hands).
- **The Logic:**
  - The app maps the Face Landmarks (specifically the lips).
  - It maps the Hand Landmarks (specifically the index finger tip).
  - It calculates the 3D Euclidean distance between the finger and the lips.
  - If **Distance < 0.08** (very close), it flags the frame as “Suspicious.”
- **Why this way?** This is extremely fast but “dumb.” It will flag smoking, but also eating, scratching a nose, or yawning.

### Step 3: AI Verification (Gemini 1.5)
- **The Goal:** Eliminate false positives (eating/yawning).
- **The Tech:** Google Gemini 1.5 Flash (Multimodal LLM).
- **The Logic:**
  - The app takes the clusters of “Suspicious” frames found in Step 2.
  - It picks the middle frame of each event (the “peak” of the action).
  - It sends that single image to Gemini with the prompt: “Is the person holding a cigarette, vape, or smoking device TO or NEAR their mouth?”
  - If Gemini says **“NO”**, the event is discarded (it was just a yawn).
  - If Gemini says **“YES”**, the timestamp is saved.

### Step 4: Event Merging
- **The Logic:** If the AI detects smoking at 00:10, 00:12, and 00:15, we don’t want three separate 1‑second clips. The app merges these into one continuous event range (e.g., 00:08 to 00:17).

### Step 5: Evidence Compilation
- **The Output:** The app uses ffmpeg again to physically cut the video at the verified timestamps, add a few seconds of “padding” before and after, and stitch them into a single `evidence.mp4` file.

## 4. Key Technical Decisions

### Why Single File?
Typically, an app like this has a `frontend/` folder (React) and a `backend/` folder (Python).

- **Consolidation:** By embedding the HTML/CSS/JS inside the Python string `HTML_DASHBOARD`, the entire app becomes portable. You can email this one file to a colleague, and if they have Python, it works.

### BackgroundTasks (Async)
Video processing blocks the CPU. If we ran the logic inside the API route, the webpage would freeze until the video finished (which could take minutes).

- **Solution:** We use FastAPI’s `BackgroundTasks`. The server says “Upload Received (200 OK)” immediately, and the heavy lifting happens in a separate thread while the UI polls for updates.

### Polling vs. WebSockets
The UI uses Polling (checking `/progress/{job_id}` every second).

- **Why:** While WebSockets are “better” for real-time, Polling is significantly more robust and easier to deploy in simple environments (like Docker containers or behind corporate firewalls) without configuring complex timeout settings.

## 5. The User Interface (UI)
The UI is built with Tailwind CSS via CDN.

- **Visual Feedback:** It uses a “Step” visualizer. This tells the user exactly where the backend is (e.g., “Currently verifying with Gemini”).
- **State Management:** The JavaScript is vanilla (no React/Vue). It manages state by toggling CSS classes (`hidden`, `opacity-50`, `step-active`, `step-done`).

## 6. How to Extend/Scale It
If you wanted to take this from a script to a startup product:

- **Database:** Replace the `jobs = {}` dictionary with Redis or PostgreSQL so job data survives server restarts.
- **Storage:** Replace local `uploads/` folder with AWS S3 or Google Cloud Storage.
- **Queue:** Use Celery or BullMQ to handle multiple users uploading videos at once (currently, too many simultaneous uploads would slow down the CPU).

---

## 7. Job State Model & Data Flow
To make the system debuggable and scalable, define a minimal job state schema and keep it consistent between the API, worker, and UI.

**Suggested job fields**
- `id`: Unique job identifier (UUID).
- `status`: `queued | extracting | scanning | verifying | merging | compiling | complete | failed`.
- `progress`: Percentage (0–100) for UI progress bar.
- `frames_total`: Total frames extracted.
- `frames_suspicious`: Count of frames flagged in MediaPipe.
- `events_verified`: Count of events confirmed by Gemini.
- `timestamps`: Array of verified event ranges (e.g., `{start: 8.2, end: 17.4}`).
- `output_path`: Evidence clip location.
- `error`: Error message, if any.

**Why it matters:** A structured job state makes it trivial to surface accurate progress, resume failed jobs, and aggregate analytics across multiple users.

## 8. Reliability, Failures, and Edge Cases
Computer vision workloads fail for predictable reasons. Designing for failure keeps the product trustworthy.

**Common failure scenarios**
- **Corrupted or unsupported video formats** → ffmpeg fails to decode.
- **Low-light footage** → Face/hand landmarks become unreliable, increasing false negatives.
- **Camera angle / occlusion** → The hand or mouth is not visible, so the heuristic fails to trigger.
- **Crowded scenes** → Multiple faces/hands cause false matches between the wrong hand and mouth.

**Mitigations**
- Validate codecs at upload and reject unsupported formats early.
- Add a “confidence heatmap” of MediaPipe detections to explain misses.
- Use per-person tracking to keep hand/face landmarks linked to the same individual.
- Add a “minimum event duration” filter to suppress one-frame anomalies.

## 9. Privacy, Security, and Compliance
This is surveillance data, so privacy and auditability are as important as detection accuracy.

**Privacy controls**
- **Retention:** Auto-delete uploads after evidence compilation.
- **Redaction:** Optional face blurring in the final evidence clip.
- **Access:** Signed URLs or time-limited tokens for evidence downloads.

**Security practices**
- Store evidence clips encrypted at rest.
- Encrypt uploads in transit (HTTPS only).
- Log all evidence access with timestamps and user IDs for audit trails.

**Compliance considerations**
- Follow local legal requirements for surveillance data handling.
- Provide configurable retention policies per customer.

## 10. Performance Targets & Cost Control
The cascade approach is designed to keep performance predictable and costs low.

**Benchmark targets**
- **Single 1‑hour video** → processed under 15 minutes on CPU.
- **Gemini calls** → only for clustered suspicious events, not every frame.
- **Average cost per video** → dominated by LLM calls, should stay under a small fixed budget.

**Optimization levers**
- Lower FPS further for static scenes (2 FPS).
- Batch Gemini requests (multi-image) for contiguous events.
- Cache verification results if re-processing the same footage.

## 11. Monitoring & Observability
When deployed at scale, you need operational visibility.

**Metrics to track**
- **Processing time per step** (extract, scan, verify, compile).
- **False positive rate** and **false negative rate** (based on human review).
- **Average LLM cost per job**.
- **Queue depth** and worker utilization.

**Alerts**
- Gemini error rate spikes.
- Evidence compilation failure > 1%.
- Upload latency above threshold.

## 12. Roadmap / Future Enhancements
If the product evolves beyond v2.0, the roadmap could include:

- **Multi-person tracking** with persistent IDs across frames.
- **Device classification** (cigarette vs. vape vs. cigar) in AI verification.
- **Scene context awareness** to down-weight food/drink false positives.
- **Streaming mode** for real-time alerts instead of offline batch processing.
- **Chain-of-custody reports** with tamper-evident hashes on evidence clips.
