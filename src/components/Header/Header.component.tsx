import { memo } from 'react';

import { HeaderStyled, HeaderWrapper } from './Header.styles';
import Categories from './Categories';
import Search from './Search';

type Props = {
	commerceLogo: string;
	commerceName: string;
	showCategories?: boolean;
};

export const Header = memo(({ commerceLogo, commerceName, showCategories = true }: Props) => (
	<HeaderWrapper className="sticky">
		<HeaderStyled>
			<Search commerceLogo={commerceLogo}/>
			{showCategories && <Categories commerceName={commerceName} />}
		</HeaderStyled>
	</HeaderWrapper>
));
