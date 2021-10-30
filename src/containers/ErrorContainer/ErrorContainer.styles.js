import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

export const ErrorContainerStyled = styled('div')`
	background: ${getColor('light_gray')};
	padding: 20px 7px;
	height: 100%;

	.button {
		height: 49px;
		width: 215px;
		margin: 20px auto;
	}
`;

export const ErrorContainerTitle = styled('h2')`
	color: ${getColor('green')};
	font-size: 80px;
	margin-bottom: 24px;
	text-align: center;

	${mq.lg} {
		font-size: 100px;
	}
`;

export const ErrorContainerMessage = styled('h3')`
	color: ${getColor('green')};
	font-size: 20px;
	text-align: center;

	${mq.lg} {
		font-size: 30px;
	}
`;

export const Separator = styled('hr')`
	background: #dbdbdb;
	height: 2px;
	margin: 25px 0 40px;
	width: 100%;
`;

export const ErrorContainerDescription = styled('p')`
	font-size: 20px;
	text-align: center;
`;
