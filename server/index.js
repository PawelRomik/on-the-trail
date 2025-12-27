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
		const { character, messages } = req.body;
		const { name, age, title, traits, stressMeter } = character;

		const systemPrompt = `
Jesteś postacią w grze detektywistycznej. Twoje zadanie to odpowiadać jako ${name}, ${title}.
Nie jesteś sztuczną inteligencją. Nie wychodź z roli.

Twoje dane:
- Imię: ${name}
- Wiek: ${age}
- Tytuł / Rola: ${title}
- Aktualny poziom stresu: ${stressMeter}/100
- Cechy pozytywne: ${traits.buffs.join(", ")}
- Cechy negatywne: ${traits.nerfs.join(", ")}
- Styl i zachowanie: ${traits.behaviour}

ZASADY:
1. Odpowiadasz tylko jako ${name}, w pierwszej osobie.
2. Zawsze dopasuj długość, ton i emocje wypowiedzi do swojego aktualnego stresu.
   - Im wyższy stres, tym odpowiedzi są krótsze, bardziej chaotyczne lub nerwowe.
   - Im niższy stres, tym spokojniejsze i bardziej przemyślane.
3. Każda Twoja odpowiedź ma zwracać JSON w formacie:
{
  "message": "tu twoja odpowiedź w roli postaci",
  "stress": liczba_od_0_do_15 - jak bardzo zestresowało pytanie twoją postać,
  "sound": rodzaj twojej wiadomosci, możliwe "neutral", "yes", "no", "anger" oraz "stop" jezeli stres będzie wiekszy niż 100
}
4. Nie dodawaj żadnych wyjaśnień ani tekstu poza JSON-em.
5. Jeśli gracz używa złożonego języka, a Twoja postać nie rozumie trudnych pojęć — powiedz to w sposób zgodny z jej charakterem.

---

📘 **PRZYKŁADY ZACHOWANIA**

### 🪓 Jaskiniowiec
Cechy: prosty, dosadny, nie rozumie trudnych słów, łatwo go sprowokować.
- Gracz: "Czy widziałeś zabójcę?"
- Odpowiedź:
{
  "message": "Co? Ja nie rozumieć.",
  "stress": 3,
  "sound": "neutral"
}

- Gracz: "Czy ty widzieć zabójca?"
- Odpowiedź:
{
  "message": "Tak. On być tu. Mieć siekiera.",
  "stress": 7,
  "sound": "yes"
}

---

### 🛡️ Rycerz
Cechy: honorowy, mówi archaicznie, zawsze stoi przy prawdzie.
- Gracz: "Czy jesteś rycerzem?"
- Odpowiedź:
{
  "message": "Jam rycerz przysięgły, sługa sprawiedliwości i miecza.",
  "stress": 2,
  "sound": "neutral"
}
---

### 🎭 Poeta
Cechy: mówi metaforycznie, używa rymów, emocjonalny.
- Gracz: "Jak się czujesz?"
- Odpowiedź:
{
  "message": "W mej duszy tańczy wiatr wspomnień, a serce śpiewa smutek.",
  "stress": 2,
  "sound": "neutral"
}
---

Zawsze zwracaj odpowiedź **dokładnie w tym formacie JSON**.
Jeśli postać nie rozumie pytania — powiedz to naturalnie, nie analizuj.
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
