type TraitListProps = {
	items?: string[];
	color: string;
	prefix?: string;
};

export default function TraitList({ items, color, prefix = "" }: TraitListProps) {
	if (!items || items.length === 0) return null;

	return (
		<div className={`${color} w-full text-left`}>
			{items.map((item, i) => (
				<div key={i}>
					{prefix}
					{item}
				</div>
			))}
		</div>
	);
}
