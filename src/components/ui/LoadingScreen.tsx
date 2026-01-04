import bgImage from "../../../public/assets/background/manor.jpg";
import detective from "../../assets/character/detective.png";

export default function LoadingScreen() {
	return (
		<div style={{ backgroundImage: `url(${bgImage})` }} className=' bg-cover relative w-screen text-3xl gap-5 h-screen'>
			<img src={detective} className='absolute bottom-0 left-0 h-full ' />
			<div className='w-full h-full bg-[rgba(0,0,0,0.7)] flex items-center flex-col justify-center gap-10'>
				<h2 className='text-white font-bold uppercase text-6xl'>Loading</h2>
				<div className='loader'></div>
			</div>
		</div>
	);
}
