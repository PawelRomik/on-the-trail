import { useSettings } from "../../utils/context/settings-context/useSettings";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import playSound from "../../utils/misc/playSound";
import stone from "../../assets/ui/stone.png";
import book from "../../assets/ui/notes.png";
import settings from "../../assets/ui/ustawienia.png";
import knife from "../../assets/ui/kosa.png";
import knife_a from "../../assets/ui/kosa_a.png";
import stone_a from "../../assets/ui/stone_a.png";

export default function Navbar() {
	const { setActiveView, setKnifeActive, knifeActive } = useViewContext();
	const { voiceVolume } = useSettings();

	const openNotepad = () => {
		playSound("book_open", voiceVolume);
		setActiveView("notepad");
	};

	const openSettings = () => {
		playSound("button_press", voiceVolume);
		setActiveView("settings");
	};

	const setKnife = () => {
		playSound("scythe_pickup", voiceVolume);
		setKnifeActive((prev) => !prev);
	};
	return (
		<nav className='w-[200px] h-full bg-black flex flex-col p-5 text-6xl gap-5 items-center justify-center'>
			<button onClick={openNotepad} style={{ backgroundImage: `url(${stone})` }} className='hover:brightness-125 bg-zinc-800 group  hover:cursor-pointer flex-1  w-full text-white'>
				<img src={book} className='w-full p-3 group-hover:p-0 transition-all' />
			</button>
			<button
				onClick={setKnife}
				style={{ backgroundImage: `url(${knifeActive ? stone_a : stone})` }}
				className={`group bg-zinc-800 hover:brightness-125 hover:cursor-pointer flex-1  w-full text-white `}
			>
				<img src={knifeActive ? knife_a : knife} className={`w-full p-3 ${knifeActive && "rotate-180"} group-hover:p-0 transition-all`} />
			</button>
			<button
				style={{ backgroundImage: `url(${stone})` }}
				onClick={openSettings}
				className='bg-zinc-800 group hover:brightness-125 transition hover:cursor-pointer flex-1  w-full text-white'
			>
				<img src={settings} className='w-full p-3 group-hover:p-0 transition-all' />
			</button>
		</nav>
	);
}
