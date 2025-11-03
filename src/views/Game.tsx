import { useEffect, useState } from "react";
import library from "../assets/background/library.jpg";
import Character from "../components/Character";
import charactersData from "../data/characters.json";
import namesData from "../data/names.json";

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName(gender: boolean) {
	const list = gender ? namesData.male : namesData.female;
	return list[Math.floor(Math.random() * list.length)];
}

type Character = {
	id: number;
	name: string;
	age: number;
	stressMeter: number;
	color: string;
	gender: boolean;
	desc: string;
};

export default function Game() {
	const [characters, setCharacters] = useState<Character[]>([]);

	useEffect(() => {
		const firstFour = charactersData.slice(0, 4);

		const randomized = firstFour.map((char) => ({
			...char,
			age: getRandomInt(char.age[0], char.age[1]),
			name: getRandomName(char.gender),
			stressMeter: getRandomInt(0, 100)
		}));

		const shuffled = [...randomized].sort(() => 0.5 - Math.random());

		setCharacters(shuffled);
	}, []);

	return (
		<div className='w-screen h-screen bg-contain bg-center' style={{ backgroundImage: `url(${library})` }}>
			<div className='w-full h-[800px] flex gap-4'>
				{characters.map((char) => (
					<Character key={char.id} character={char} />
				))}
			</div>
		</div>
	);
}
