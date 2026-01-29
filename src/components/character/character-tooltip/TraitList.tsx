type TraitType = "buff" | "nerf" | "special";

type TraitItem = {
	id: string;
	name: string;
	desc: string;
};

type TraitListProps = {
	items?: TraitItem[];
	type: TraitType;
};

const TYPE_COLOR: Record<TraitType, string> = {
	buff: "rgba(0, 255, 255, 0.8)",
	nerf: "rgba(255, 0, 0, 0.8)",
	special: "rgba(255, 215, 0, 0.9)"
};

export default function TraitList({ items, type }: TraitListProps) {
	if (!items || items.length === 0) return null;

	return (
		<div className='w-full flex flex-col text-left'>
			{items.map((item) => (
				<div className='p-2 flex gap-3 items-start' key={item.id}>
					<img src={`/assets/perks/${item.id}.png`} alt={item.name} className='w-8 h-8 mt-1' />

					<div>
						<span className='text-sm font-bold' style={{ color: TYPE_COLOR[type] }}>
							{item.name}
						</span>

						<p className='text-xs opacity-80'>{item.desc}</p>
					</div>
				</div>
			))}
		</div>
	);
}
