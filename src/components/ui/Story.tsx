import { useStoryContext } from "../../utils/context/story-context/useStoryContext";

export default function Story() {
	const { location, intro } = useStoryContext();
	return (
		<div className='text-white text-center bg-[rgba(0,0,0,0.8)] px-[10%] mb-5 py-3 text-sm gap-3 flex flex-col  '>
			<h1 className='uppercase text-4xl font-bold '>{location}</h1>
			<h3 className='text-zinc-400 italic'>{intro}</h3>
		</div>
	);
}
