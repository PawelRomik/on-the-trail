type TraitListProps = {
	items?: string[];
	color: string;
	prefix?: string;
};

export default function TraitList({ items, color, prefix = "" }: TraitListProps) {
	if (!items || items.length === 0) return null;

	return (
		<div className={`${color} p-1 w-full flex-col text-left flex gap-2`}>
			{items.map((item, i) => (
				<div style={{ backgroundColor: color }} className='p-2 glass text-sm font-bold' key={i}>
					{prefix}
					{item}
				</div>
			))}
		</div>
	);
}
