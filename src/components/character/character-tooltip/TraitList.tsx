type TraitListProps = {
	items?: string[];
	color: string;
	prefix?: string;
};

export default function TraitList({ items, color, prefix = "" }: TraitListProps) {
	if (!items || items.length === 0) return null;

	return (
		<div className={`${color}  w-full flex-col text-left flex`}>
			{items.map((item, i) => (
				<div className='p-2 text-sm font-bold' key={i}>
					<span className='font-bold text-3xl' style={{ color: color }}>
						{prefix}
					</span>
					{item}
				</div>
			))}
		</div>
	);
}
