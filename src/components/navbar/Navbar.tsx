import { useViewContext } from "../../utils/context/view-context/useViewContext";

export default function Navbar() {
	const { setActiveView } = useViewContext();

	return (
		<nav className='w-[200px] h-full bg-black flex flex-col p-5 text-6xl gap-5 items-center justify-center'>
			<button onClick={() => setActiveView("notepad")} className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
				<i className='ri-book-2-fill'></i>
			</button>
			<button className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
				<i className='ri-auction-fill'></i>
			</button>
			<button onClick={() => setActiveView("settings")} className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
				<i className='ri-settings-2-fill'></i>
			</button>
		</nav>
	);
}
