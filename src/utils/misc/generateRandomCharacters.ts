import type { CharacterType } from "../../types/CharacterType";
import charactersData from "../../data/characters.json";
import getRandomInt from "./getRandomInt";
import getRandomName from "./getRandomName";
import getRandomCharacters from "./getRandomCharacters";

export default function generateRandomCharacters(): CharacterType[] {
	let characters = getRandomCharacters(charactersData, 4);
	const usedNames = new Set<string>();

	// --- special_borrowedtrait ---
	characters = characters.map((c) => {
		if (!c.traits?.special?.includes("special_borrowedtrait")) return c;

		const others = characters.filter((o) => {
			if (o.id === c.id) return false;

			if (o.traits?.special && o.traits.special.length > 0) return false;

			if (o.traits?.buffs?.includes("buff_innocent")) return false;

			return true;
		});

		if (others.length === 0) return c;

		const borrowed = others[getRandomInt(0, others.length - 1)];

		return {
			...c,
			actorTraits: {
				buffs: borrowed.traits?.buffs ?? [],
				nerfs: borrowed.traits?.nerfs ?? [],
				special: (borrowed.traits?.special ?? []).filter((s) => s !== "special_borrowedtrait")
			}
		};
	});

	// --- buff_innocent: max 1 ---
	let innocentAlreadyUsed = false;

	characters = characters.map((c) => {
		if (c.traits?.buffs?.includes("buff_innocent")) {
			if (innocentAlreadyUsed) {
				return {
					...c,
					traits: {
						...c.traits,
						buffs: c.traits.buffs.filter((b) => b !== "buff_innocent")
					}
				};
			}
			innocentAlreadyUsed = true;
		}
		return c;
	});

	// --- traitor: no buff_innocent ---
	const traitorCandidates = characters.map((c, index) => ({ c, index })).filter(({ c }) => !c.traits?.buffs?.includes("buff_innocent"));

	const traitorIndex = traitorCandidates.length > 0 ? traitorCandidates[getRandomInt(0, traitorCandidates.length - 1)].index : -1;

	// --- nerf_stresschars ---
	const stressNerfCount = characters.filter((c) => c.traits?.nerfs?.includes("nerf_stresschars")).length;

	const stressPenalty = stressNerfCount * 10;

	const getUniqueRandomName = (gender: boolean): string => {
		let name = "";
		let safety = 0;

		do {
			name = getRandomName(gender);
			safety++;
			if (safety > 50) break; // zabezpieczenie awaryjne
		} while (usedNames.has(name));

		usedNames.add(name);
		return name;
	};

	// --- final ---
	return characters.map((c, index) => {
		let baseStress = 0;

		if (stressNerfCount > 0 && !c.traits?.nerfs?.includes("nerf_stresschars")) {
			baseStress += stressPenalty;
		}

		return {
			...c,
			age: getRandomInt(c.age[0], c.age[1]),
			name: getUniqueRandomName(c.gender),
			stressMeter: Math.min(baseStress, 100),
			traitor: index === traitorIndex,
			jesterTruth: c.traits?.special?.includes("special_truthliecycle") ? (Math.random() < 0.5 ? "truth" : "lie") : "lie"
		};
	});
}
