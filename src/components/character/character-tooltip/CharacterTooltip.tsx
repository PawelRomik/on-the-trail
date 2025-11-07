import CharacterTooltipContent from "./CharacterToolTipContent";
import type { CharacterType } from "../../../types/CharacterType";
import { useEffect, useState } from "react";

type TooltipPos = {
	x: number | null;
	y: number | null;
	flipX: boolean;
};

type CharacterTooltipProps = {
	character: CharacterType;
};

export default function CharacterTooltip({ character }: CharacterTooltipProps) {
	const [tooltipPos, setTooltipPos] = useState<TooltipPos>({
		x: null,
		y: null,
		flipX: false
	});

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const margin = 220;
			const flip = window.innerWidth - e.clientX < margin;
			setTooltipPos({ x: e.clientX, y: e.clientY, flipX: flip });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	if (tooltipPos.x === null || tooltipPos.y === null) return null;

	return (
		<div
			className='absolute bg-black border-zinc-600 border-3 text-white p-1 rounded-xl shadow-lg text-sm z-50 pointer-events-none max-w-xs'
			style={{
				top: tooltipPos.y + 10,
				left: tooltipPos.flipX ? tooltipPos.x - 220 : tooltipPos.x + 10
			}}
		>
			{character.traits && <CharacterTooltipContent character={character} />}
		</div>
	);
}
