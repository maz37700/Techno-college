async function callGemini(model, apiKey, body) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  return { ok: r.ok, status: r.status, data };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY n'est pas configurée sur Vercel" });
  }

  try {
    const { messages = [], system, maxTokens = 1000 } = req.body || {};

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: typeof m.content === "string" ? m.content : String(m.content ?? "") }],
    }));
    const body = {
      contents,
      generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 },
    };
    if (system) body.systemInstruction = { parts: [{ text: system }] };

    const primary = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const fallback = "gemini-2.5-flash-lite";
    const candidates = primary === fallback ? [primary] : [primary, fallback];

    let last = null;
    for (const model of candidates) {
      for (let attempt = 0; attempt < 2; attempt++) {
        const result = await callGemini(model, apiKey, body);
        last = { ...result, model };
        if (result.ok) {
          const text =
            result.data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
          return res.status(200).json({ text, model });
        }
        // Retry only on transient errors (overload / rate-limited / server error)
        if (![429, 500, 502, 503, 504].includes(result.status)) break;
        await sleep(800 * (attempt + 1));
      }
    }

    return res.status(last?.status || 500).json({
      error: last?.data?.error?.message || "Erreur API Gemini",
      model: last?.model,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Erreur serveur" });
  }
}
