import { getColor } from 'styles/utils';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

type Props = {
	value: number;
	left?: boolean;
	right?: boolean;
	style?: { [key: string]: any };
};

const Discount = (props: Props) => (
	<DiscountStyled {...props}>
		<span className="value bold">{props.value.toFixed(0)}%</span> dsto
	</DiscountStyled>
);

const rightStyles = () => css`
	border-radius: 12px 12px 12px 0;
	right: 5px;
`;

const leftStyles = () => css`
	border-radius: 12px 12px 0;
	left: 5px;
`;

const DiscountStyled = styled('span')`
	background: ${getColor('red')};
	color: ${getColor('white')};
	font-size: 10px;
	height: 32px;
	line-height: 32px;
	text-align: center;
	position: absolute;
	top: 7px;
	width: 70px;
	z-index: 1;

	${(props: any) => props.left && leftStyles};
	${(props: any) => props.right && rightStyles};

	.value {
		font-size: 13px;
	}
`;

export default Discount;
