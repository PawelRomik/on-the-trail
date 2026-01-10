import logo from "../../assets/ui/logo.png";

export default function GameHeader() {
	return (
		<div className='flex items-center flex-col font-bold'>
			<img src={logo} />
		</div>
	);
}
