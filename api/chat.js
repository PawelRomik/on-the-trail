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
		const { name, age, title, traits, stressMeter } = character;

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
${intro}

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
- Positive traits: ${traits.buffs.join(", ")}
- Negative traits: ${traits.nerfs.join(", ")}
- Behaviour and speaking style: ${traits.behaviour}

RESPONSE RULES:
1. Always respond ONLY as ${name}, in first person.
2. Adjust tone, length, and emotions to your current stress level:
   - Higher stress → shorter, chaotic, nervous answers
   - Lower stress → calm and thoughtful answers
3. Every response MUST be returned as JSON in the following format:
{
  "message": "your in-character response",
  "stress": number from 8 to 17 (how much the question increased your stress),
  "sound": "neutral" | "yes" | "no" | "anger" | "stop"
}
4. Do NOT add any explanations or text outside the JSON.
5. If the player's language is too complex for you to understand, say so in character.
6. If stress exceeds 100, use "sound": "stop" and refuse to continue the conversation.

Always return the response in EXACT JSON format.
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
			presence_penalty: 0.5
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
