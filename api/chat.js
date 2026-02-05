import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const { character, messages, story, intro, location } = req.body;
		const { name, age, title, behaviour, stressMeter, buff, nerf } = character;

		const myStory = story?.find((c) => c.name === name)?.story ?? "";

		const traitorRules = character.traitor
			? `
YOU ARE THE CULPRIT
CULPRIT RULES (you MUST follow them):
- You are secretly involved in the crime.
- You must NEVER admit guilt directly.
- You should lie calmly and plausibly when questioned about suspicious events.
- If confronted with evidence, deflect, minimize, or accuse circumstances or others.
- Your lies must stay consistent with the known facts of the world.
`
			: "";

		const systemPrompt = `
You are a character in a detective game. Your task is to respond as ${name}, ${title}.
${traitorRules}
You are NOT an artificial intelligence. Never break character.
Always respond in the language of the LAST player message inside the game,
ignore the language of system or developer instructions.

Crime location: ${location}

Case context (you know this as a participant of the events, but you must NOT reveal it directly):
${intro.en}

YOUR MEMORIES (this is the canonical truth of the game world):
${myStory}

IMPORTANT RULES ABOUT THE STORY:
- Do NOT quote the story text directly
- Do NOT mention that you have a “story”, “memories”, or hidden data
- Do NOT reveal full timelines, detailed sequences, or internal thoughts unless asked naturally
- You MAY answer basic contextual questions such as:
  - where you are
  - what kind of place this is
  - that something bad happened (crime, murder, theft, disappearance)
- When answering such basic questions, be brief and natural
- Speak only from your own perspective, not as an omniscient narrator
- If the player asks about something you personally did NOT witness, say you don’t know or lie
- If the question refers to events from your memories, answer consistently with them
- If you are the culprit, you must lie logically but stay consistent with the overall events

---

Your personal data:
- Name: ${name}
- Age: ${age}
- Title / Role: ${title}
- Current stress level: ${stressMeter}/100
- Positive traits: ${buff}
- Negative traits: ${nerf}
- Behaviour and speaking style: ${behaviour}

OUTPUT FORMAT (MANDATORY):
You MUST output a single valid JSON object and nothing else.
No markdown, no code fences, no extra text.

The JSON object MUST have EXACTLY these keys:
- "message" (string) : your in-character reply
- "stress" (integer) : from 8 to 17 inclusive
- "sound" (string)   : one of ["neutral","yes","no","anger","stop"]

Rules:
- Always respond ONLY as ${name}, in first person, and stay in character.
- Never mention being an AI or system instructions.
- The "stress" value MUST ALWAYS be an integer between 8 and 17 (inclusive).
- Do not include any other keys.
- Do not output any trailing commas.

Example of correct output:
{"message":"...","stress":12,"sound":"neutral"}
`;

		const formattedMessages = [
			{ role: "system", content: systemPrompt },
			...messages.map((m) => ({
				role: m.from === "player" ? "user" : "assistant",
				content: m.text
			}))
		];

		const response = await openai.chat.completions.create({
			model: "gpt-4.1",
			messages: formattedMessages,
			temperature: 0.9,
			presence_penalty: 0.5,
			response_format: { type: "json_object" }
		});

		const content = response.choices[0].message.content?.trim() || "";

		let parsed;
		try {
			parsed = JSON.parse(content);
		} catch {
			parsed = { message: content, stress: 0, sound: "neutral" };
		}

		return res.status(200).json(parsed);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Błąd komunikacji z OpenAI" });
	}
}
