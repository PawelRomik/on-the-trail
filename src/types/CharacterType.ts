export type CharacterType = {
	id: number;
	name?: string;
	setName?: string;
	title: string;
	age: number | number[];
	stressMeter: number;
	gender: boolean;
	setGender?: boolean;
	traits: {
		buffs?: string[];
		nerfs?: string[];
		special?: string[];
		behaviour: string[];
	};
	story?: string;
	traitor: boolean;
	actorTraits?: {
		buffs?: string[];
		nerfs?: string[];
		special?: string[];
		behaviour: string[];
	};
	infernalBargainUsed?: boolean;
	jesterTruth?: "truth" | "lie";
};
