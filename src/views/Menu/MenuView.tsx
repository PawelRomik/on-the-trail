import { useEffect } from "react";
import police from "../../assets/background/police.jpg";
import MenuBackgroundCharacter from "../../components/menu/BackgroundCharacter";
import GameHeader from "../../components/menu/GameHeader";
import MenuButtons from "../../components/menu/MenuButtons";
import { MenuFooter } from "../../components/menu/MenuFooter";

import menuMusic from "/assets/sound/music/menu.mp3";

type MainMenuProps = {
	onStart: () => void;
};

export default function MenuView({ onStart }: MainMenuProps) {
	useEffect(() => {
		const audio = new Audio(menuMusic);
		audio.loop = true;
		audio.volume = 0.3;
		audio.muted = true;
		audio.play().catch(() => {});

		document.addEventListener(
			"click",
			() => {
				audio.muted = false;
				audio.play().catch(() => {});
			},
			{ once: true }
		);

		return () => {
			audio.pause();
			audio.currentTime = 0;
		};
	}, []);

	return (
		<div style={{ backgroundImage: `url(${police})` }} className='bg-cover h-screen relative text-white'>
			<main className='bg-[rgba(0,0,0,0.6)] w-full h-full flex flex-col items-center justify-center'>
				<GameHeader />
				<MenuButtons onStart={onStart} />
				<MenuBackgroundCharacter />
			</main>
			<MenuFooter />
		</div>
	);
}
