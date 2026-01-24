import bgImage from "/assets/background/manor.jpg";
import detective from "../../assets/character/detective.png";
import kosa from "../../assets/ui/kosa.png";
import { useRandomTexts } from "../../utils/hooks/useRandomTexts";

export default function LoadingScreen() {
	const { loadingText, tipText } = useRandomTexts();

	return (
		<div style={{ backgroundImage: `url(${bgImage})` }} className='bg-cover relative w-screen text-3xl gap-5 h-screen'>
			<div className='w-full h-full bg-[rgba(0,0,0,0.7)] flex items-center flex-col justify-center gap-10'>
				<h2 className='text-white font-bold uppercase text-4xl z-30 border-b-4 p-3 py-2 border-b-red-800 rounded-full'>{loadingText}</h2>
				<img src={kosa} className='w-[100px] rotating' />
				<img src={detective} className='absolute bottom-0 left-0 h-full' />
				<p className='text-gray-300 absolute bottom-5 gap-1 flex text-lg mt-5 bg-[rgba(0,0,0,0.6)] py-3 px-2'>
					<i className='ri-lightbulb-fill text-red-800'></i>
					{tipText}
				</p>
			</div>
		</div>
	);
}
