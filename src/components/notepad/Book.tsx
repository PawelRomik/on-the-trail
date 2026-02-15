import Stickers from "./Stickers";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import cover from "../../assets/ui/cover.png";
import React, { useRef, useState } from "react";
import DetectivePage from "./pages/DetectivePage";
import HTMLFlipBook from "react-pageflip";
import StoryPage from "./pages/StoryPage";
import CharacterPage from "./pages/CharacterPage";
import NotesPage from "./pages/NotesPage";
import HistoryPage from "./pages/HistoryPage";
import ChatPage from "./pages/ChatPage";
import playSound from "../../utils/misc/playSound";
import { useSettings } from "../../utils/context/settings-context/useSettings";

export type FlipBookRef = React.ElementRef<typeof HTMLFlipBook>;

type FlipEvent = {
	data: number;
};

export default function Book() {
	const bookRef = useRef<FlipBookRef | null>(null);
	const { voiceVolume } = useSettings();
	const { setActiveView, lastView } = useViewContext();

	const [page, setPage] = useState(0);

	const handleFlip = (e: FlipEvent) => {
		setPage(e.data);
	};

	const closeNotes = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
		if (e.target === e.currentTarget) {
			setActiveView(lastView ? lastView : "game");
		}
	};

	const handleFlipState = (state: { data: string }) => {
		if (state.data !== "fold_corner" && state.data !== "read") {
			playSound("page_flip", voiceVolume);
		}
	};

	return (
		<div onClick={(e) => closeNotes(e)} className='w-full relative h-full flex items-center justify-center pt-5 bg-[rgba(0,0,0,0.8)]'>
			<div
				style={{ backgroundImage: `url(${cover})` }}
				className='w-[60%] caveat-regular h-[90%] p-2 z-10 relative rounded-lg m-auto flex glow-animate items-center justify-center'
			>
				<Stickers bookRef={bookRef} page={page} />
				{/* @ts-expect-error react-pageflip */}
				<HTMLFlipBook
					ref={bookRef}
					onChangeState={handleFlipState}
					onFlip={handleFlip}
					className='cursor-grab '
					usePortrait={false}
					width={500}
					height={750}
					showPageCorners={false}
					size='stretch'
					showCover={false}
				>
					<NotesPage />
					<DetectivePage />

					<HistoryPage />
					<StoryPage />

					<ChatPage id={0} />
					<CharacterPage id={0} />

					<ChatPage id={1} />
					<CharacterPage id={1} />

					<ChatPage id={2} />
					<CharacterPage id={2} />

					<ChatPage id={3} />
					<CharacterPage id={3} />
				</HTMLFlipBook>
			</div>
		</div>
	);
}
