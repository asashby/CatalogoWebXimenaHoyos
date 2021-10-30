import { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Category } from 'models/Category';
import { getColor } from 'styles/utils';
import StoreIcon from 'components/icons/StoreIcon';

const TitleIcon = (props) => <StoreIcon {...props} height={20} color="red" />;

type MenuProps = {
	data: Category;
};

const Menu = ({ data }: MenuProps): ReactElement => (
	<MenuStyled className="container flex column">
		<MenuTitle className="bold">
			{data.icon ? <i className={`icon-${data.icon}`} /> : <TitleIcon />}
			{data.name}
		</MenuTitle>
		<MenuBanner>
			<img
				src={`/images/banners/categories/${data.slug}.png`}
				srcSet={`/images/banners/categories/${data.slug}@2x.png 2x, /images/categories/${data.slug}@3x.png 3x`}
				alt={data.name}
			/>
		</MenuBanner>
	</MenuStyled>
);

const MenuStyled = styled('div')`
	background: ${getColor('white')};
	height: 100%;
	width: 100%;
	padding: 37px 23px;
`;

const MenuTitle = styled('h2')`
	color: ${getColor('red')};
	font-size: 20px;
	margin-bottom: 27px;
	text-align: center;

	i {
		max-height: 20px;
		margin-right: 10px;
	}
`;

const MenuBanner = styled('picture')`
	height: 320px;
	margin-bottom: 8px;
	overflow: hidden;
	text-align: center;
	width: 100%;

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
		object-position: center;
	}
`;

export default Menu;
