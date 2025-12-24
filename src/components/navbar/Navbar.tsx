import { useSettings } from "../../utils/context/settings-context/useSettings";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import playSound from "../../utils/misc/playSound";

export default function Navbar() {
	const { setActiveView } = useViewContext();
	const { voiceVolume } = useSettings();

	const openNotepad = () => {
		setActiveView("notepad");
	};

	const openSettings = () => {
		playSound("button_press", voiceVolume);
		setActiveView("settings");
	};

	return (
		<nav className='w-[200px] h-full bg-black flex flex-col p-5 text-6xl gap-5 items-center justify-center'>
			<button onClick={openNotepad} className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
				<i className='ri-book-2-fill'></i>
			</button>
			<button className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
				<i className='ri-auction-fill'></i>
			</button>
			<button onClick={openSettings} className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
				<i className='ri-settings-2-fill'></i>
			</button>
		</nav>
	);
}
