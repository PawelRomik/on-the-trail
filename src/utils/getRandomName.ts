import namesData from "../data/names.json";

export default function getRandomName(gender: boolean) {
	const list = gender ? namesData.male : namesData.female;
	return list[Math.floor(Math.random() * list.length)];
}
