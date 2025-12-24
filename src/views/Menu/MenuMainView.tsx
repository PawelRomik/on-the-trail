import MenuBackgroundCharacter from "../../components/menu/BackgroundCharacter";
import GameHeader from "../../components/menu/GameHeader";
import MenuButtons from "../../components/menu/MenuButtons";
import { MenuFooter } from "../../components/menu/MenuFooter";

type MenuMainViewProps = {
	onStart: () => void;
};

export default function MenuMainView({ onStart }: MenuMainViewProps) {
	return (
		<div className='bg-cover h-screen relative text-white'>
			<main className='bg-[rgba(0,0,0,0.6)] w-full h-full flex flex-col items-center justify-center'>
				<GameHeader />
				<MenuButtons onStart={onStart} />
				<MenuBackgroundCharacter />
			</main>
			<MenuFooter />
		</div>
	);
}
