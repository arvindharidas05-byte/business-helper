import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ai", async (req, res) => {
  const idea = req.body.idea;

  const prompt = `
You are an AI startup leadership team.

Respond ONLY in JSON:
{
  "CEO": "...",
  "CFO": "...",
  "CMO": "..."
}

Startup idea:
${idea}
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_API_KEY",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  res.json(JSON.parse(text));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
