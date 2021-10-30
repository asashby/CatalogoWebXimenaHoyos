import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

export const CartModalStyled = styled('div')`
	align-items: center;
	animation: fadeIn ease-in 0.25s;
	background-color: rgba(0, 0, 0, 0.23);
	display: none;
	height: 100vh;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 1020;

	${mq.lg} {
		display: flex;
	}
`;

export const CartModalContentStyled = styled('div')`
	background: ${getColor('white')};
	border-radius: 8px;
	box-shadow: 2px 0 15px 0 rgba(0, 0, 0, 0.18);
	height: auto;
	justify-content: space-between;
	margin-top: -10px;
	max-height: 92%;
	max-width: 483px;
	min-height: auto;
	overflow-y: auto;
	padding: 26px 25px;
	position: relative;
	width: 92%;
`;
