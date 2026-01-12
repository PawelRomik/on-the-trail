import { useMemo } from "react";

type KnifeBackgroundProps = {
	active: boolean;
};

export default function KnifeBackground({ active }: KnifeBackgroundProps) {
	const bgKills = useMemo(
		() =>
			Array.from({ length: 18 }).map((_, i) => ({
				id: i,
				left: Math.random() * 120 - 10,
				top: Math.random() * 120 - 10,
				rotate: Math.random() * 90 - 45,
				size: Math.random() * 24 + 16
			})),
		[]
	);

	return (
		<div
			className={`absolute inset-0 overflow-hidden pointer-events-none caveat-regular transition-opacity duration-300 ${
				active ? "opacity-0 group-hover:opacity-100" : "opacity-0"
			}`}
		>
			{bgKills.map((item) => (
				<p
					key={item.id}
					className='absolute font-bold italic text-red-900 select-none'
					style={{
						left: `${item.left}%`,
						top: `${item.top}%`,
						transform: `rotate(${item.rotate}deg)`,
						fontSize: `${item.size}px`
					}}
				>
					KILL
				</p>
			))}
		</div>
	);
}
