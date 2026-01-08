import MenuBackgroundCharacter from "../../components/menu/BackgroundCharacter";
import GameHeader from "../../components/menu/GameHeader";
import MenuButtons from "../../components/menu/MenuButtons";
import { MenuFooter } from "../../components/menu/MenuFooter";
import stone from "../../assets/ui/stone.png";

type MenuMainViewProps = {
	onStart: () => void;
};

export default function MenuMainView({ onStart }: MenuMainViewProps) {
	return (
		<div className='bg-cover h-screen relative text-white'>
			<main className='bg-[rgba(0,0,0,0.6)] w-full h-full flex flex-col z-20 justify-center relative'>
				<div className='h-full px-8 shadow-xl shadow-red-600 flex flex-col w-[500px] absolute left-[10%] items-center justify-center' style={{ backgroundImage: `url(${stone})` }}>
					<GameHeader />
					<MenuButtons onStart={onStart} />
				</div>

				<MenuBackgroundCharacter />
			</main>
			<MenuFooter />
		</div>
	);
}
