import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.VITE_OPENAI_API_KEY
});

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const { characters } = req.body;

		const culprit = characters[Math.floor(Math.random() * characters.length)];

		const prompt = `
You are a game master creating a hidden, highly detailed detective story.

INPUT:
- Characters: ${characters.map((c) => `- ${c.name} (${c.title})`).join("\n")}
- Culprit: ${culprit.name} (${culprit.title})

TASK:
1. Choose EXACTLY ONE location from:
   church, graveyard, hospital, library, manor, museum, police, train

2. Write an INTRO for the detective (visible to the player) that briefly explains:
   - where the events take place
   - what happened
   - why an investigation has begun
   Keep it concise, clear, and factual.

3. For EACH character listed in Characters, write ONE continuous, highly detailed story...

OUTPUT:
Return ONLY valid JSON in this EXACT structure:
{
  "location": "...",
  "intro": {
    "pl": "...",
    "en": "..."
  },
  "characters": [
    {
      "name": "...",
      "story": "..."
    }
  ]
}
Do not add anything outside JSON.
`;

		const response = await openai.chat.completions.create({
			model: "gpt-4.1",
			messages: [{ role: "system", content: prompt }],
			temperature: 0.8
		});

		const story = JSON.parse(response.choices[0].message.content);

		return res.status(200).json(story);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Błąd generowania historii" });
	}
}
