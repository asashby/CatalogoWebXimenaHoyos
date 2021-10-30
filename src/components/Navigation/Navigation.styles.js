import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

export const NavigationStyled = styled('nav')`
	align-items: center;
	background: ${getColor('light_gray')};
	height: auto;
	margin: auto;
	padding: 0 20px;
	width: 100%;

	${mq.md} {
		height: 40px;
	}

	${mq.lg} {
		justify-content: space-between;
		padding: 0 45px;
	}

	${mq.xl} {
		padding: 0 60px;
	}
`;

export const MessageStyled = styled('div')`
	color: ${getColor('dark_gray')};
	font-size: 13px;
	line-height: 19px;
	text-align: center;
	padding: 10px 12px 8px;
	width: 100%;

	${mq.lg} {
		padding: 0;
		text-align: left;
		width: 75%;
	}
`;

export const MessageHashTag = styled('span')`
	margin-right: 2px;
`;

export const MessageText = styled('span')``;

export const NavigationMenu = styled('div')`
	display: none;

	${mq.lg} {
		display: flex;
		justify-content: flex-end;
		flex: 1;
	}
`;

export const NavigationMenuItem = styled('a')`
	color: ${getColor('dark_gray')};
	cursor: pointer;
	font-size: 12px;
	margin: 0 5px;
	padding: 6px 10px;

	&:last-child {
		align-items: center;
		color: ${getColor('red')};
		margin-right: 0;
	}
`;
