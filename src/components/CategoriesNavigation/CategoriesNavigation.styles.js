import styled from '@emotion/styled';

import { getColor, mq } from 'styles/utils';

export const CategoriesNavigationList = styled('ul')`
	padding: 13px 0;
	list-style: none;
	position: relative;
`;

export const CategoriesNavigationItem = styled('li')`
	align-items: center;
	color: #909090;
	height: 46px;
	line-height: 28px;
	margin-bottom: 7px;
	position: relative;
	transition: all 0.25s linear;

	a {
		align-items: center;
		color: #909090;
		display: flex;
		font-size: 13px;
		padding-left: 30px;
		width: 100%;
	}

	i[class^='icon-'] {
		color: #909090;
		font-size: 18px;
		margin-right: 6px;
		text-align: center;
		width: 25px;
	}

	i.icon-automotriz {
		font-size: 10px;
	}

	&:before {
		background: transparent;
		box-sizing: content-box;
		content: '';
		height: 100%;
		left: 0;
		position: absolute;
		transition: 0.2s all linear;
		width: 18px;
	}

	&:hover {
		color: ${getColor('red')};
		background: #f6f6f6;

		i[class^='icon-'] {
			color: ${getColor('red')};
		}

		&:before {
			background: ${getColor('red')};
		}

		a {
			color: ${getColor('red')};
			font-weight: bold;
		}
	}

	${mq.lg} {
		height: 28px;

		a {
			font-size: 11px;
			padding-left: 27px;
		}

		&:before {
			width: 12px;
		}
	}
`;

export const CategoriesNavigationSubMenu = styled('div')`
	position: absolute;
	background: transparent;
	left: 100%;
	display: none;
	width: 600px;
	height: 100%;
	padding: 14px 21px 20px;
	opacity: 0;
	top: 0;
	z-index: 1005;
	transition: all 0.25s linear;

	&.show {
		display: flex;
		justify-content: space-between;
		opacity: 1;
		background: #f6f6f6;
	}
`;

export const CategoriesNavigationSubMenuList = styled('ul')`
	padding: 13px;
	list-style: none;
`;

export const CategoriesNavigationSubMenuItem = styled('li')`
	color: ${getColor('black')};
	font-size: 11px;
	line-height: 1.18;
	margin-bottom: 16px;
	transition: color 0.25s linear;

	&:hover {
		color: ${getColor('green')};
		font-family: 'Poppins-SemiBold';
		font-weight: 600;
	}
	a {
		color: ${getColor('black')};
	}
`;

export const Mypes = styled('div')``;

export const MypesProducts = styled('div')`
	justify-content: flex-start;

	picture {
		border-radius: 12px;
		height: 80%;
		width: auto;
		margin-bottom: 8px;

		img {
			max-width: 100%;
			max-height: 100%;
			object-fit: cover;
			object-position: center;
		}
	}
`;

export const MypesLogos = styled('div')`
	justify-content: space-around;
	margin-left: 17px;

	span {
		background: ${getColor('white')};
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		height: 49px;
		line-height: 49px;
		text-align: center;
		width: 140px;
	}
`;
