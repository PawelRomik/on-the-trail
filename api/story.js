import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const { characters } = req.body;

		const keenEyeCharacters = characters.filter((c) => c.buffs?.includes("buff_storydetails"));

		const culprit = characters[Math.floor(Math.random() * characters.length)];

		const keenEyeNames = keenEyeCharacters.map((c) => c.name).join(", ");

		const prompt = `
You are a game master creating a hidden, highly detailed detective story.

INPUT:
- Characters:
${characters.map((c) => `- ${c.name}`).join("\n")}
- Culprit: ${culprit.name} (${culprit.title})

SPECIAL RULE:
${
	keenEyeCharacters.length > 0
		? `
- The following character(s) have the trait "Keen Eye": ${keenEyeNames}
- For these characters:
  - Their personal story MUST be significantly longer and more detailed.
  - They must have directly seen or noticed EVERY other character at some point.
  - Their story contains additional observations, movements, and small details.
`
		: ""
}

TASK:
1. Choose EXACTLY ONE location from:
   church, graveyard, hospital, library, manor, museum, police, train

2. Write an INTRO for the detective (visible to the player) that briefly explains:
   - where the events take place
   - what happened
   - why an investigation has begun
   Keep it concise, clear, and factual.

3. For EACH character listed in Characters:
   - Write ONE continuous, in-character story of the events.
   - Do NOT reveal who the culprit is.
   - Do NOT contradict the main timeline.

IMPORTANT:
- Stories of characters with "Keen Eye" are longer and richer.
- Stories of other characters are normal length.

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
