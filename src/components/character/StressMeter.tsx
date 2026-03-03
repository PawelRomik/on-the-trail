import { useTranslation } from "react-i18next";
import blood from "../../assets/ui/blood.png";

export default function StressMeter({ meter }: { meter: number }) {
	const { t } = useTranslation();

	return (
		<div className='relative  w-full md:py-3 p-1   md:px-3 '>
			<div className='bg-zinc-850 shadow w-full h-3 py-2 md:py-0 md:h-6 p-0.5 lg:border-2 rounded-full overflow-hidden relative'>
				<div style={{ backgroundImage: `url(${blood})`, width: `${meter}%` }} className=' h-full bg-center bg-cover'></div>
				{meter > 0 && (
					<p className='absolute text-stroke-3 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm md:text-xl font-bold bangers'>
						{t("ui.stress", { amount: meter })}
					</p>
				)}
			</div>
		</div>
	);
}
