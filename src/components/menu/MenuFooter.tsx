export function MenuFooter() {
	return (
		<footer className='w-full h-[50px] absolute bottom-0 flex items-end justify-between px-5'>
			<div className='flex font-bold items-end opacity-25 justify-center gap-1'>
				<a href='on-the-trail.vercel.app' title='live demo'>
					<p>on-the-trail.vercel.app</p>
				</a>
			</div>
			<div className='flex font-bold items-end justify-center gap-1'>
				<p>0.4.2</p>
				<a href='https://github.com/PawelRomik/on-the-trail' title='github'>
					<i className='ri-github-fill text-4xl'></i>
				</a>
			</div>
		</footer>
	);
}
