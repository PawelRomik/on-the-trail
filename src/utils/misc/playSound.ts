export default function playSound(sound: string, volume: number = 50) {
	const audio = new Audio(`assets/sound/ui/${sound}.mp3`);
	audio.volume = Math.max(0, Math.min(1, volume / 100));
	audio.play();
}
