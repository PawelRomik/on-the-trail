import kosa from "../../../assets/ui/kosa_a.png";

type KnifeOverlayProps = {
	active: boolean;
};

export default function KnifeOverlay({ active }: KnifeOverlayProps) {
	return (
		<span
			className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex flex-col items-center justify-center
        text-7xl font-bold italic caveat-regular text-red-800
        pointer-events-none transition-opacity duration-300
        ${active ? "opacity-0 group-hover:opacity-100" : "opacity-0"}`}
		>
			<img src={kosa} />

			<span className='wave inline-flex'>
				{"KILL".split("").map((char, i) => (
					<span key={i} style={{ "--i": i } as React.CSSProperties}>
						{char === " " ? "\u00A0" : char}
					</span>
				))}
			</span>
		</span>
	);
}
