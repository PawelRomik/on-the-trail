import type { HistoryEntry } from "../../utils/hooks/useChat";

export default function Note({ entry }: { entry: HistoryEntry }) {
	const { character, message } = entry;
	const isPlayer = message.from === "player";

	return (
		<div className={`flex ${isPlayer ? "justify-start" : "justify-end"}`}>
			<div className={`flex gap-3 ${isPlayer ? "items-start" : "items-end"} flex-col p-2 rounded-2xl bg-yellow-50 border border-yellow-300 shadow-inner`}>
				<span className='border-b-2 px-3 text-center font-semibold' style={{ color: isPlayer ? "#000" : character.color }}>
					{isPlayer ? "Ty" : character.name}
				</span>
				<span>{message.text}</span>
			</div>
		</div>
	);
}
