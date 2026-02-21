import { useTranslation } from "react-i18next";
import type { CharacterType } from "../../types/CharacterType";
import CharacterInformation from "./CharacterInformation";
import StressMeter from "./StressMeter";
import stone from "../../assets/ui/stone.png";
import baner from "../../assets/ui/banner_red.png";

export default function CharacterSummary({ character }: { character: CharacterType }) {
	const { name, age, gender, stressMeter } = character;
	const { t } = useTranslation();
	return (
		<div style={{ backgroundImage: `url(${stone})` }} className='hidden lg:flex flex-col py-1 bg-zinc-900 shadow-dark w-full items-center  justify-center'>
			<div className='w-full flex items-center justify-center shadow mb-1 bg-cover' style={{ backgroundImage: `url(${baner})` }}>
				<h2 title={t(`names.${name}`)} className='flex gap-1 items-center tracking-wide -skew-3 opacity-90 justify-center bangers text-5xl font-bold stroke-single'>
					{t(`names.${name}`)}
				</h2>
			</div>

			<CharacterInformation age={age} gender={gender} />
			<StressMeter meter={stressMeter} />
		</div>
	);
}
