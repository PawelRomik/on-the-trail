import logo from "../../assets/ui/logo.png";

export default function GameHeader() {
	return (
		<div className='flex items-center w-[130%] md:w-full flex-col font-bold'>
			<img src={logo} />
		</div>
	);
}
