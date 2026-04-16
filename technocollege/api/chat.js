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
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.7,
      },
    };
    if (system) {
      body.systemInstruction = { parts: [{ text: system }] };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({
        error: data?.error?.message || "Erreur API Gemini",
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Erreur serveur" });
  }
}
