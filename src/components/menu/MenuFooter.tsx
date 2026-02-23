import { GAME_VERSION } from "../../config";

export function MenuFooter() {
	return (
		<footer className='w-full  flex-col absolute top-5 md:right-0 right-10 z-20 flex items-end justify-between px-5'>
			<div className='flex font-bold items-end justify-center gap-1'>
				<p>{GAME_VERSION}</p>
				<a href='https://github.com/PawelRomik/on-the-trail' title='github'>
					<i className='ri-github-fill text-4xl'></i>
				</a>
			</div>
		</footer>
	);
}
