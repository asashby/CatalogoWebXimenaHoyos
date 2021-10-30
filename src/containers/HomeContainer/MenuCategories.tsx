import styled from '@emotion/styled';
import { CategoriesNavigation } from 'components/CategoriesNavigation';
import MenuIcon from 'components/icons/MenuIcon';
import { getColor } from 'styles/utils';

const MenuCategories = () => (
	<MenuCategoriesStyled className="container flex column">
		<div className="title flex row">
			<MenuIcon color="#FFF" dot />
			<span className="text">Categorias</span>
		</div>
		<CategoriesNavigation />
	</MenuCategoriesStyled>
);

const MenuCategoriesStyled = styled('div')`
	background: ${getColor('white')};
	height: 100%;
	width: 100%;

	.title {
		align-items: center;
		background: ${getColor('green')};
		border-radius: 12px 12px 0 0;
		height: 42px;
		padding: 0 30px;
		width: 100%;

		.text {
			color: ${getColor('white')};
			margin-left: 10px;
		}
	}
`;

export default MenuCategories;
