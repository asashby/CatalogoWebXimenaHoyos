import styled from '@emotion/styled';
import { ReactElement } from 'react';
import { getColor, mq } from 'styles/utils';

type Props = {
	className?: string;
	color?: string;
	handleClick?: () => void;
	isWhite?: boolean;
	quantity?: number;
};

const CartIcon = ({
	quantity,
	isWhite,
	color,
	handleClick,
	className = ''
}: Props): ReactElement => (
	<CartIconStyled
		onClick={handleClick ? handleClick : undefined}
		className={className}
	>
		{quantity ? (
			<span className={`total-items ${isWhite ? 'white' : ''}`}>
				{quantity}
			</span>
		) : null}
		<i
			className={`icon-cart ${isWhite ? 'white' : ''}`}
			style={{ color }}
		/>
	</CartIconStyled>
);

const CartIconStyled = styled('div')`
	position: relative;

	.total-items {
		background: ${getColor('red')};
		border-radius: 50%;
		color: ${getColor('white')};
		font-size: 12px;
		line-height: 18px;
		position: absolute;
		right: -12px;
		text-align: center;
		top: -8px;
		height: 19px;
		width: 19px;
		transition: 0.25s all linear;

		&.white {
			background: ${getColor('white')};
			color: ${getColor('red')};
		}

		${mq.md} {
			line-height: 22px;
			height: 23px;
			width: 23px;
		}
	}

	.icon-cart {
		color: ${getColor('green')};
		font-size: 24px;
		font-weight: 500;

		&.white {
			color: ${getColor('white')};
		}
	}
`;

export default CartIcon;
