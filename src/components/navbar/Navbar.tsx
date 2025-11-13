import { useTranslation } from "react-i18next";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useChatContext } from "../../utils/context/chat-context/useChatContext";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import generateRandomCharacters from "../../utils/misc/generateRandomCharacters";

export default function Navbar() {
	const { setActiveView } = useViewContext();
	const { setCharacters, setSelectedCharacter } = useCharactersContext();
	const { resetChats } = useChatContext();
	const { i18n } = useTranslation();

	const resetCharacters = () => {
		const characters = generateRandomCharacters();
		setCharacters(characters);
		setSelectedCharacter(null);
		resetChats(characters);
	};

	const toggleLocale = () => {
		const newLocale = i18n.language === "pl" ? "en" : "pl";
		i18n.changeLanguage(newLocale);
		localStorage.setItem("userLocale", newLocale);
	};

	return (
		<nav className='w-[200px] h-full bg-black flex flex-col p-5 text-6xl gap-5 items-center justify-center'>
			<button onClick={() => setActiveView("notepad")} className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
				<i className='ri-book-2-fill'></i>
			</button>
			<button onClick={resetCharacters} className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
				<i className='ri-auction-fill'></i>
			</button>
			<button onClick={toggleLocale} className='bg-zinc-800 border-2 hover:cursor-pointer flex-1 border-zinc-700 w-full text-white'>
				<i className='ri-settings-2-fill'></i>
			</button>
		</nav>
	);
}
