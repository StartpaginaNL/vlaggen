import { put, get } from "@vercel/blob";
import { Readable } from "node:stream";

const BLOB_KEY = "flagquiz/scores.json";
const TOKEN    = process.env.BLOB_READ_WRITE_TOKEN;

async function readScores() {
  try {
    const result = await get(BLOB_KEY, { token: TOKEN, access: "private" });
    if (result?.statusCode !== 200 || !result.stream) return [];
    // Convert web ReadableStream to a Buffer
    const chunks = [];
    for await (const chunk of Readable.fromWeb(result.stream)) chunks.push(chunk);
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return [];
  }
}

async function writeScores(scores) {
  await put(BLOB_KEY, JSON.stringify(scores), {
    access: "private",
    token: TOKEN,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const scores = await readScores();
    const sorted = [...scores].sort((a, b) => b.score - a.score);
    return res.status(200).json({
      solo: sorted.filter(r => r.mode === "solo").slice(0, 20),
      duel: sorted.filter(r => r.mode === "duel").slice(0, 20),
    });
  }

  if (req.method === "POST") {
    const { name, score, mode } = req.body;

    if (!name || typeof score !== "number" || !["solo", "duel"].includes(mode))
      return res.status(400).json({ error: "Invalid payload" });
    if (score < 0 || score > 20000)
      return res.status(400).json({ error: "Score out of range" });
    if (name.length > 30)
      return res.status(400).json({ error: "Name too long" });

    const scores = await readScores();
    scores.push({
      name: name.trim(),
      score,
      mode,
      date: new Date().toLocaleDateString("en-GB"),
      created_at: new Date().toISOString(),
    });

    const trimmed = [...scores].sort((a, b) => b.score - a.score).slice(0, 500);
    await writeScores(trimmed);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
