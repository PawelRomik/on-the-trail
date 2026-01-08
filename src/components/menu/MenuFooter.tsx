export function MenuFooter() {
	return (
		<footer className='w-full  flex-col absolute top-5 right-0 z-20 flex items-end justify-between px-5'>
			<div className='flex font-bold items-end justify-center gap-1'>
				<p>0.6.5</p>
				<a href='https://github.com/PawelRomik/on-the-trail' title='github'>
					<i className='ri-github-fill text-4xl'></i>
				</a>
			</div>
			<div className='flex font-bold items-end text-red-800 opacity-40 justify-center gap-1'>
				<a href='on-the-trail.vercel.app' title='live demo'>
					<p>on-the-trail.vercel.app</p>
				</a>
			</div>
		</footer>
	);
}
