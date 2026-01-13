import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
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

---

BEHAVIOR EXAMPLES

### Caveman
Traits: simple, blunt, does not understand complex words, easily provoked.
Player: "Did you see the murderer?"
Response:
{
  "message": "What? Me not understand.",
  "stress": 9,
  "sound": "neutral"
}
---

### Knight
Traits: honorable, archaic speech, always values truth.
Player: "Are you a knight?"
Response:
{
  "message": "I am a sworn knight, bound to justice and steel.",
  "stress": 8,
  "sound": "neutral"
}

---

Always return the response in EXACT JSON format.
If you do not understand a question — say so naturally, in character.
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

		res.json(parsed);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Błąd komunikacji z OpenAI" });
	}
});

app.post("/api/story", async (req, res) => {
	const { characters } = req.body;

	const culprit = characters[Math.floor(Math.random() * characters.length)];

	const prompt = `
You are a game master creating a hidden, highly detailed detective story.

INPUT:
- Characters: ${characters.map((c) => `- ${c.name} (${c.title})`).join("\n")}
- Culprit: ${culprit}

TASK:
1. Choose EXACTLY ONE location from:
   church, graveyard, hospital, library, manor, museum, police, train

2. Write an INTRO for the detective (visible to the player) that briefly explains:
   - where the events take place
   - what happened
   - why an investigation has begun
   Keep it concise, clear, and factual.

3. For EACH character listed in Characters, write ONE continuous, highly detailed story describing:
   - what the character was doing
   - where they were at different moments
   - when (early / middle / late or approximate minutes)
   - which other characters they saw
   - what exactly those other characters were doing when seen
   - how long the observation lasted and from what perspective
   - any brief moments when someone disappeared from view

CRITICAL OBSERVATION RULES:
- Each character MUST see at least 2 other characters.
- Each character must be seen by at least one other character.
- No character sees everything perfectly.
- Observations must overlap but differ slightly in perspective.
- At most one short observation gap per character is allowed.
- All descriptions MUST be logically consistent.

CRIME REQUIREMENT (CRITICAL):
- In the story of the character specified as Culprit, you MUST explicitly describe
  the concrete criminal action they performed.
- This action must be written as a normal sequence of events
  (e.g. taking an object, harming someone, tampering with evidence).
- Do NOT describe it as a crime or guilt.
- Do NOT add moral judgment, conclusions, or accusations.
- The action must clearly explain why an investigation has started.
- The criminal action must occur during the described time window
  and fit all observations made by other characters.

STORY DESIGN RULES:
- The culprit’s actions MUST be consistent with all observations.
- The culprit must have at least one short, plausible moment of limited visibility.
- No character may explicitly identify the culprit.
- No accusations, guesses, or conclusions.
- The story must be rich enough for interrogation gameplay.

OUTPUT:
Return ONLY valid JSON in this EXACT structure:

{
  "location": "...",
  "intro": "...",
  "characters": [
    {
      "name": "...",
      "story": "..."
    }
  ]
}

Do not add explanations, markdown, or text outside JSON.
This story is hidden from the player except for the intro.
`;

	const response = await openai.chat.completions.create({
		model: "gpt-4.1",
		messages: [{ role: "system", content: prompt }],
		temperature: 0.8
	});

	const story = JSON.parse(response.choices[0].message.content);

	res.json(story);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server działa na porcie ${PORT}`));
