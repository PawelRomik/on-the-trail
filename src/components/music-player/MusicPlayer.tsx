import { useEffect, useRef } from "react";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import { useSettings } from "../../utils/context/settings-context/useSettings";

type AudioPlayerProps = {
	loop?: boolean;
	muted?: boolean;
	unmuteOnClick?: boolean;
};

const MusicPlayer = ({ loop = true, muted = false, unmuteOnClick = false }: AudioPlayerProps) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const { musicMode } = useViewContext();
	const { musicVolume } = useSettings();
	const src = `/assets/sound/music/${musicMode}.mp3`;

	useEffect(() => {
		const audio = new Audio(src);
		audio.loop = loop;
		audio.volume = musicVolume / 100;
		audio.muted = muted;

		audio.play().catch(() => {});
		audioRef.current = audio;

		let handleClick: (() => void) | null = null;

		if (unmuteOnClick) {
			handleClick = () => {
				audio.muted = false;
				audio.play().catch(() => {});
			};
			document.addEventListener("click", handleClick, { once: true });
		}

		return () => {
			audio.pause();
			audio.src = "";
			audio.load();

			if (handleClick) {
				document.removeEventListener("click", handleClick);
			}

			audioRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [src]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = musicVolume / 100;
		}
	}, [musicVolume]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.muted = muted;
		}
	}, [muted]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.loop = loop;
		}
	}, [loop]);

	return null;
};

export default MusicPlayer;
