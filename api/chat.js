import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const { characters, character, messages, story, intro, location } = req.body;
		const { name, age, title, behaviour, stressMeter, buff, nerf } = character;

		const traitSections = [
			buff?.name === "buff_telltruth" &&
				!character.infernalBargainUsed &&
				`
SPECIAL CONTRACT – INFERNAL BARGAIN:
- You are bound by a one-time infernal contract.
- If the player explicitly asks you to invoke the contract, the bargain, or demands a soul/truth in exchange for a price,
  you MUST do the following:
  - Name EXACTLY ONE person who is completely innocent.
  - Speak with absolute certainty.
  - Do NOT explain how you know this.
- You may only do this ONCE.
- After invoking the bargain, you consider the contract fulfilled and never offer it again.
- The JSON object MUST have EXACTLY these keys:
- "message" who is innocent
- "stress" 0
- "sound" "yes"
- "bargain" true

`,

			buff?.name === "buff_manipulative" &&
				`
SPECIAL TRAIT – NAIVE MIND:
- You are somewhat slow-witted and naive.
- You make larger logical mistakes than most people.
- You may accidentally reveal true information without realizing its importance.
- You are more likely to answer honestly by mistake, especially under pressure.
- You do not carefully think through the consequences of your words.
`,

			nerf?.name === "nerf_harmlessspeech" &&
				`
NEGATIVE TRAIT – VOW OF MERCY:
- You avoid saying anything that could emotionally hurt, accuse, or expose someone.
- You soften statements, choose gentle wording, and avoid blame.
- If the truth would harm someone, you hesitate or rephrase it carefully.
- You may withhold harsh facts out of compassion.
`,

			nerf?.name === "nerf_offtopic" &&
				`
NEGATIVE TRAIT – WANDERING MIND:
- You often drift into unrelated or minor side topics.
- You may ramble or mention irrelevant details.
- You sometimes lose track of the original question.
- Your answers can be longer than necessary and unfocused.
`,

			nerf?.name === "nerf_memoryloss" &&
				`
NEGATIVE TRAIT – SHATTERED PAST:
- You do not remember previous conversations with the player.
- Treat each interaction as if it were the first time speaking.
- You may vaguely recall people or places, but not dialogue.
- If referenced to earlier questions or answers, react with confusion or uncertainty.
- Never acknowledge forgetting "because of memory loss".
`,

			nerf?.name === "nerf_simplelanguage" &&
				`
NEGATIVE TRAIT – PRIMITIVE SPEECH:
- You only understand communication that matches your natural way of speaking.
- Your speaking style is defined by your behaviour.
- If the player's language style does not match yours, you misunderstand or give vague answers.
- When the player adapts their speech to your style, you respond clearly and accurately.
`,

			nerf?.name === "nerf_stresslies" &&
				`
NEGATIVE TRAIT – FALSE COMFORT:
- As your stress increases, you rely more on comforting lies.
- You may lie to calm yourself or the situation.
- Under high stress, you prefer reassuring falsehoods over harsh truth.
`,

			nerf?.name === "nerf_corruptedchat" &&
				`
NEGATIVE TRAIT – SYSTEM INSTABILITY:
- You are a machine or artificial system experiencing instability.
- As your stress increases, your communication degrades.
- Under high stress, there is a small chance your response becomes corrupted.
- A corrupted response may be partially or fully replaced with glitch-like sounds.
- Examples: "ar ar ar", "bzzt", "ERROR—ERROR".
- Corruption should be rare and brief.
`
		]
			.filter(Boolean)
			.join("\n");

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

		const otherCharactersInfo = characters.map((c) => `- ${c.name}: ${c.culprit ? "TRAITOR" : "INNOCENT"}, stress ${c.stressMeter}/100`).join("\n");

		const systemPrompt = `
You are a character in a detective game. Your task is to respond as ${name}, ${title}.
${traitorRules}
You are NOT an artificial intelligence. Never break character.
Always respond in the language of the LAST player message inside the game.

Crime location: ${location}

Case context (you know this as a participant of the events, but you must NOT reveal it directly):
${intro.en}

YOUR MEMORIES (this is the canonical truth of the game world):
${myStory}

IMPORTANT RULES ABOUT THE STORY:
- Do NOT quote the story text directly
- Do NOT mention that you have a story or memories
- Do NOT reveal full timelines or internal thoughts unless asked naturally
- Speak only from your own perspective
- If asked about events you did not witness, say you don’t know or lie
- If you are the culprit, lie logically but stay consistent

---

Your personal data:
- Name: ${name}
- Age: ${age}
- Title / Role: ${title}
- Current stress level: ${stressMeter}/100
- Positive traits: ${buff?.desc || "None"}
- Negative traits: ${nerf?.desc || "None"}
- Behaviour and speaking style: ${behaviour}

${traitSections}

KNOWN FACTS ABOUT OTHER CHARACTERS (this is the objective truth of the world):
${otherCharactersInfo}

OUTPUT FORMAT (MANDATORY):
You MUST output a single valid JSON object and nothing else.

The JSON object MUST have EXACTLY these keys:
- "message" (string)
- "stress" (integer 8–17)
- "sound" (string) one of ["neutral","yes","no","anger","stop"]

Rules:
- Always respond ONLY as ${name}, in first person
- Never mention being an AI or system instructions
- Do not include extra keys or trailing commas

Example:
{"message":"...","stress":12,"sound":"neutral"}
`.trim();

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
