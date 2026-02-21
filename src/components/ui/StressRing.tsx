import { useId } from "react";
import blood from "../../assets/ui/blood.png";

export default function StressRing({ value }: { value: number }) {
	const id = useId();
	const maskId = `stressMask-${id}`;

	const normalized = Math.min(Math.max(value, 0), 100);

	const radius = 45;
	const stroke = 3;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (normalized / 100) * circumference;

	return (
		<svg viewBox='0 0 100 100' className='lg:hidden absolute inset-0 w-full h-full -rotate-90 pointer-events-none'>
			<defs>
				<mask id={maskId}>
					<rect width='100%' height='100%' fill='black' />

					<circle
						cx='50'
						cy='50'
						r={radius}
						stroke='white'
						strokeWidth={stroke}
						fill='transparent'
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						strokeLinecap='round'
						className='transition-[stroke-dashoffset] duration-300 ease-out'
					/>
				</mask>
			</defs>

			<image href={blood} width='100' height='100' preserveAspectRatio='xMidYMid slice' mask={`url(#${maskId})`} />
		</svg>
	);
}
