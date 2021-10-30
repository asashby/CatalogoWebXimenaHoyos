import styled from '@emotion/styled';

import { getColor, mq } from 'styles/utils';

export const ProductDetailStyled = styled('div')``;

export const ProductDetailName = styled('h2')`
	color: ${getColor('black')};
	font-size: 16px;
	line-height: 1.15;
	margin: 10px 0;
	width: 92%;

	${mq.lg} {
		font-size: 21px;
		max-width: 300px;
	}
`;

export const ProductDetailCommerceName = styled('span')`
	color: ${getColor('black')};
	font-size: 14px;
	margin: 6px 0;
`;

export const ProductDetailCode = styled('span')`
	color: ${getColor('dark_gray')};
	font-size: 12px;
	margin: 6px 0;
`;

export const ProductDetailPrices = styled('div')`
	align-items: center;
	margin: 12px 0;

	.now {
		color: ${getColor('black')};
		font-size: 27px;
		margin-right: 10px;
	}

	.before {
		color: #494949;
		font-size: 15px;
		opacity: 0.53;
		text-decoration: line-through;
	}
`;

export const ProductDetailSales = styled('div')`
	.sold {
		background-color: rgba(118, 118, 118, 0.1);
		border-radius: 5px;
		color: ${getColor('black')};
		font-size: 12px;
		height: 31px;
		margin-right: 8px;
		padding: 0 12px;
	}

	a {
		color: ${getColor('red')};
		float: right;
		font-size: 14px;
		text-decoration: underline;
	}
`;

export const ProductDetailActionsStyled = styled('div')`
	margin: 25px 0;
`;

export const ProductDetailActionsInput = styled('input')`
	background: ${getColor('light_gray')};
	border-radius: 2px;
	color: #494949;
	height: 45px;
	line-height: 45px;
	margin-right: 5px;
	text-align: center;
	width: 54px;
`;

export const ProductDetailActionsButtons = styled('div')``;

export const ProductDetailActionsButton = styled('button')`
	background: #494949;
	border-radius: 2px;
	color: ${getColor('white')};
	font-size: 10px;
	height: 21px;
	line-height: 21px;
	transition: 0.25s background linear;
	width: 26px;

	&:disabled {
		background: #d8d8d8;
	}

	&:first-of-type {
		margin-bottom: 3px;
	}
`;

export const ProductDetailActionSubmit = styled('button')`
	border: solid 1px ${getColor('green')};
	border-radius: 5px;
	color: ${getColor('green')};
	height: 45px;
	font-size: 14px;
	margin-left: 13px;
	width: 168px;

	&:disabled {
		opacity: 0.65;
	}
`;

export const ProductFeaturesStyled = styled('div')`
	padding: 10px 0;
`;

export const ProductFeature = styled('div')`
	margin: 20px 0;
`;

export const ProductFeatureName = styled('h4')`
	color: ${getColor('black')};
	font-size: 14px;
	margin: 6px 0;
`;

export const ProductFeatureItems = styled('div')`
	flex-wrap: wrap;
	justify-content: flex-start;
`;

export const ProductFeatureItem = styled('span')`
	border-radius: 5px;
	border: solid 0.8px rgba(118, 118, 118, 0.55);
	color: #9a9a9a;
	font-size: 14px;
	line-height: 32px;
	margin: 6px 6px 0 0;
	min-height: 32px;
	padding: 0 14px;
	transition: all 0.25s linear;
	width: auto;

	&:first-of-type {
		margin-left: 0;
	}

	&:hover,
	&.selected {
		border-color: ${getColor('green')};
		color: ${getColor('green')};
	}
`;
