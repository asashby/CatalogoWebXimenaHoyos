import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

export const ProductSectionStyled = styled('section')`
	background: ${getColor('white')};
	padding: 14px 14px 24px;
	margin-top: 10px;

	${mq.md} {
		padding: 13px 21px 30px 18px;
	}
`;

export const ProductSectionToggle = styled('div')`
	align-items: center;
	background: #f7f7f7;
	justify-content: space-between;
	padding: 16px 24px 16px 33px;
`;

export const ProductSectionTitle = styled('h3')`
	color: #10111e;
	font-size: 15px;
	line-height: 0.87;
`;

export const ProductSectionToogleIcon = styled('span')`
	border-left: 9px solid transparent;
	border-right: 9px solid transparent;
	border-top: 9px solid ${getColor('green')};
	height: 0;
	margin-top: 2px;
	transition: all 0.25s linear;
	width: 0;

	&.active {
		transform: rotate(-180deg);
	}
`;

export const ProductSectionContent = styled('div')``;

export const ProductSubSectionStyled = styled('div')`
	background: ${getColor('white')};
	padding: 10px 26px 10px 25px;
	margin: 10px 0;

	${mq.lg} {
		padding: 10px 56px 10px 45px;
	}
`;

export const ProductSubSectionTitle = styled('h4')`
	color: ${getColor('black')};
	font-size: 14px;
	margin-bottom: 6px;
`;

export const ProductSubSectionDescription = styled('p')`
	color: #787878;
	font-size: 14px;
	line-height: 1.25;
	font-weight: normal;
	margin: 8px 0 24px;
	text-align: justify;
`;

export const ProductSubSectionImage = styled('picture')`
	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
	}
`;
