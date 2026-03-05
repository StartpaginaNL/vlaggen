import { put, head, download } from "@vercel/blob";

const BLOB_KEY = "flagquiz/scores.json";
const TOKEN    = process.env.BLOB_READ_WRITE_TOKEN;

// Read current scores from Blob
async function readScores() {
  try {
    // head() checks the blob exists; download() fetches it using the token
    await head(BLOB_KEY, { token: TOKEN });
    const blob = await download(BLOB_KEY, { token: TOKEN });
    const text = await blob.text();
    return JSON.parse(text);
  } catch {
    // Blob doesn't exist yet — start fresh
    return [];
  }
}

// Write scores back to Blob
async function writeScores(scores) {
  await put(BLOB_KEY, JSON.stringify(scores), {
    access: "private",
    token: TOKEN,
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // GET /api/scores — return leaderboard
  if (req.method === "GET") {
    const scores = await readScores();
    const sorted = [...scores].sort((a, b) => b.score - a.score);
    return res.status(200).json({
      solo: sorted.filter(r => r.mode === "solo").slice(0, 20),
      duel: sorted.filter(r => r.mode === "duel").slice(0, 20),
    });
  }

  // POST /api/scores — save a new score
  if (req.method === "POST") {
    const { name, score, mode } = req.body;

    if (!name || typeof score !== "number" || !["solo", "duel"].includes(mode)) {
      return res.status(400).json({ error: "Invalid payload" });
    }
    if (score < 0 || score > 20000) {
      return res.status(400).json({ error: "Score out of range" });
    }
    if (name.length > 30) {
      return res.status(400).json({ error: "Name too long" });
    }

    const scores = await readScores();
    scores.push({
      name: name.trim(),
      score,
      mode,
      date: new Date().toLocaleDateString("en-GB"),
      created_at: new Date().toISOString(),
    });

    // Keep only top 500 scores to keep the blob small
    const trimmed = [...scores]
      .sort((a, b) => b.score - a.score)
      .slice(0, 500);

    await writeScores(trimmed);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
