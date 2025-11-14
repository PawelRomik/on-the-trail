export default function playSound(sound: string) {
	const audio = new Audio(`assets/sound/ui/${sound}.mp3`);
	audio.play();
}
