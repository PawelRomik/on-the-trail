import { type CharacterType } from "../../types/CharacterType";
import Character from "../../components/character/Character";

type CharactersViewProps = {
	characters: CharacterType[];
	onSelect: (char: CharacterType) => void;
};

export default function CharactersView({ characters, onSelect }: CharactersViewProps) {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='w-[80%] m-auto h-[800px] flex gap-4 items-center justify-center'>
				{characters.map((char) => (
					<Character key={char.id} character={char} onClick={() => onSelect(char)} />
				))}
			</div>
			<nav className='w-[200px] h-full bg-black flex flex-col p-5 text-6xl gap-5 items-center justify-center'>
				<button className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
					<i className='ri-book-2-fill'></i>
				</button>
				<button className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
					<i className='ri-auction-fill'></i>
				</button>
				<button className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
					<i className='ri-settings-2-fill'></i>
				</button>
			</nav>
		</div>
	);
}
