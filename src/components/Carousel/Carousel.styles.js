import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

export const SingleCarouselItemPicture = styled('picture')`
	display: block;
	height: 100%;
	position: relative;
	width: 100%;
	border-radius: 12px;
	overflow: hidden;

	img {
		object-fit: cover;
		object-position: center;
		max-width: 100%;
		max-height: 100%;
		width: 100%;
		height: 100%;
	}
`;
export const SingleCarouselItemPictureInMicrosite = styled('picture')`
	display: block;
	height: 100%;
	position: relative;
	width: 100%;
	border-radius: 12px;
	overflow: hidden;

	img {
		object-fit: contain;
		object-position: center;
		max-width: 100%;
		max-height: 100%;
		width: 100%;
		height: 100%;
	}
	${mq.lg} {
		img {
			object-fit: cover;
		}
	}
`;

export const SingleCarouselItemDetails = styled('div')`
	color: ${getColor('white')};
	display: flex;
	flex-direction: row;
	height: 100%;
	align-items: center;
	justify-content: space-between;
	left: 20px;
	position: absolute;
	right: 16px;
	text-align: right;
	top: 0;
	z-index: 3;

	${mq.md} {
		align-items: flex-end;
		flex-direction: column;
		justify-content: center;
		right: 32px;
	}

	${mq.md} {
		right: 75px;
	}
`;

export const SingleCarouselItemTitle = styled('h3')`
	color: ${getColor('white')};
	font-size: 25px;
	line-height: 19px;
	text-align: left;
	width: 110px;

	span {
		display: block;
		font-size: 18px;
		line-height: 19px;
	}

	${mq.md} {
		font-size: 34px;
		line-height: 25px;
		margin-bottom: 12px;
		text-align: right;

		span {
			font-size: 24px;
			line-height: 25px;
		}
	}
`;

export const SingleCarouselItemSubTitle = styled('h4')`
	font-size: 17px;
	line-height: 17px;

	${mq.md} {
		font-size: 20px;
		line-height: 22px;
	}
`;

export const SingleCarouselItemBrand = styled('picture')`
	bottom: 21px;
	left: 38px;
	max-width: 100px;
	position: absolute;
	z-index: 5;

	img {
		max-width: 100%;
	}
`;

export const MultiCarouselItemWrapper = styled('div')`
	margin-right: 16px;
	text-align: center;
`;

export const MultiCarouselItemPicture = styled('picture')`
	border-radius: 12px;
	height: 105px;
	width: 105px;
	overflow: hidden;
	display: inline-block;
	margin-bottom: 8px;

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
	}
`;

export const MultiCarouselItemDetails = styled('div')`
	color: ${getColor('black')};
	text-align: center;
`;

export const MultiCarouselItemTitle = styled('h3')`
	font-size: 11px;
	margin-bottom: 2px;
`;

export const MultiCarouselItemSubTitle = styled('h4')`
	font-size: 12px;
`;

export const MultiProductCarouselItemWrapper = styled('article')`
	background-color: ${getColor('white')};
	border-radius: 12px;
	border: solid 1px rgba(118, 118, 118, 0.09);
	height: 147px;
	padding: 11px 3px 6px;
	position: relative;
	margin-right: 7px;

	&:hover {
		&:before {
			content: '';
			background-color: rgba(255, 255, 255, 0.48);
			bottom: 0;
			left: 0;
			opacity: 0.65;
			position: absolute;
			right: 0;
			top: 0;
			transition: all 0.25s linear;
			z-index: 2;
		}

		button {
			opacity: 1;
			visibility: visible;
		}
	}
`;

export const MultiProductCarouselItemButton = styled('button')`
	background: ${getColor('green')};
	border-radius: 5px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
	color: ${getColor('white')};
	font-size: 12px;
	height: 34px;
	left: calc(50% - 66px);
	opacity: 0;
	position: absolute;
	top: calc(50% - 17px);
	transition: all 0.25s linear;
	visibility: hidden;
	width: 132px;
	z-index: 5;
`;

export const MultiProductCarouselItemPicture = styled('picture')`
	width: 51%;
	position: relative;
	overflow: hidden;

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
		border-radius: 12px;
	}
`;

export const MultiProductCarouselItemDetails = styled('div')`
	align-items: center;
	justify-content: space-around;
	padding: 10px 3px;
	width: 49%;
`;

export const MultiProductCarouselItemTitle = styled('h3')`
	color: ${getColor('black')};
	font-size: 11px;
	line-height: 1.27;
	margin-bottom: 2px;
	text-align: center;
`;

export const MultiProductCarouselItemPrice = styled('h4')`
	color: ${getColor('black')};
	font-size: 16px;
	text-align: center;
`;

export const MultiProductCarouselItemSold = styled('h4')`
	color: ${getColor('black')};
	font-size: 10px;
`;
