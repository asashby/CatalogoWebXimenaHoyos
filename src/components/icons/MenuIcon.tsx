import styled from '@emotion/styled';
import { getColor } from 'styles/utils';

type Props = {
	color?: string;
	dot?: boolean;
};

const MenuIcon = (props: Props) => (
	<MenuIconStyled
		className={`flex column ${props.dot ? 'dot' : ''}`}
		color={props.color}
	>
		<span></span>
		<span className="middle"></span>
		<span></span>
	</MenuIconStyled>
);

const MenuIconStyled = styled.div`
	span {
		background: ${(props: any) =>
			props.color ? props.color : getColor('green')};
		display: flex;
		height: 2px;
		transition: 0.25s all linear;
		width: 21px;

		&.middle {
			margin: 3px 0 4px;
		}
	}

	&.dot {
		span:before {
			content: '';
			position: relative;
			width: 2px;
			height: 2px;
			border-radius: 2px;
			left: -4px;
			top: 0;
			background: ${(props: any) =>
				props.color ? props.color : getColor('green')};
		}
	}
`;

export default MenuIcon;
