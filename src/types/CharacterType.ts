export type CharacterType = {
	id: number;
	name?: string;
	title: string;
	age: number | number[];
	stressMeter: number;
	color: string;
	gender: boolean;
	traits: {
		buffs: string[];
		nerfs: string[];
		behaviour: string[];
	};
};
