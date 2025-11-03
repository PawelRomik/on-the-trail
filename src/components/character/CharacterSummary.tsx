import type { CharacterType } from "../../types/CharacterType";
import StressMeter from "./StressMeter";

export default function CharacterSummary({ character }: { character: CharacterType }) {
	const { name, age, gender, stressMeter, color } = character;
	return (
		<div className='flex flex-col py-3 bg-zinc-900 w-full items-center justify-center'>
			<h2 style={{ color }} className='flex gap-1 items-center  justify-center bangers text-5xl font-bold text-stroke-3 '>
				{name}
			</h2>
			<p className='bangers text-2xl font-bold text-stroke-3 text-white'>
				{age} lat {gender ? <i className='ri-men-line text-blue-500' /> : <i className='ri-women-line text-pink-400' />}
			</p>
			<StressMeter meter={stressMeter} />
		</div>
	);
}
