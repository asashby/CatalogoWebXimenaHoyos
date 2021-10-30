import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

const loadingAnimation = keyframes`
	0% {
    	background-color: #fff;
  	}
  	50% {
    	background-color: #ccc;
  	}
  	100% {
    	background-color: #fff;
  	}
`;

export const Placeholder = styled.div`
	animation: ${loadingAnimation} 1s infinite;
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
`;

export const ProductCardStyled = styled('article')`
	background: ${getColor('white')};
	border-radius: 12px;
	box-shadow: 0 2px 12px 0 rgba(230, 230, 230, 0.5);
	display: flex;
	flex-direction: row;
	height: 210px;
	padding: 11px 8px 19px;
	position: relative;
	width: 100%;

	@media screen and (max-width: 768px) {
		button:hover {
			background: ${getColor('green')};
			color: ${getColor('white')};
		}
	}

	${mq.md} {
		flex-direction: column;
		height: 100%;
		padding: 13px 11px 8px 10px;
	}

	${mq.lg} {
		button {
			background: ${getColor('green')};
			color: ${getColor('white')};
			opacity: 0;
			visibility: hidden;
		}

		&:hover {
			.view-detail {
				opacity: 1;
				visibility: visible;
			}

			button {
				opacity: 1;
				visibility: visible;
			}
		}
	}
`;

export const ProductCardPictureWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 43%;

	${mq.md} {
		position: relative;
		width: 100%;
	}
`;

export const ProductCardPicture = styled('picture')`
	align-items: center;
	justify-content: center;
	border-radius: 12px;
	height: 115px;
	overflow: hidden;
	padding-right: 10px;
	position: relative;
	text-align: center;
	transition: all 0.25s linear;
	width: 100%;

	&:after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}

	img,
	.no-image {
		border-radius: 12px;
		max-height: 100%;
		object-position: center;
		object-fit: cover;
		max-width: 100%;
	}

	.no-image {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	${mq.md} {
		height: 100%;
		padding-right: 0;

		img {
			height: 100%;
			left: 0;
			top: 0;
			position: absolute;
			width: 100%;
		}
	}
`;

export const ProductCardViewer = styled('span')`
	background: ${getColor('white')};
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
	border-radius: 50%;
	height: 40px;
	line-height: 50px;
	transition: all 0.25s linear;
	width: 40px;
	text-align: center;

	.icon-view {
		color: ${getColor('green')};
		font-size: 20px;
	}

	${mq.md} {
		height: 47px;
		line-height: 56px;
		position: absolute;
		right: 8px;
		top: 8px;
		width: 47px;

		.icon-view {
			font-size: 22px;
		}
	}

	${mq.lg} {
		line-height: 40px;
		right: 6px;
		top: 10px;
		width: 34px;
		height: 34px;
		opacity: 0;
		visibility: hidden;

		.icon-view {
			font-size: 18px;
		}
	}
`;

export const ProductCardDetail = styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 12px 0px 3px 7px;
	width: 57%;

	${mq.md} {
		flex: 1;
		padding: 15px 8px 0 7px;
		width: 100%;
	}
`;

export const ProductCardTitle = styled('h3')`
	color: ${getColor('black')};
	cursor: pointer;
	font-size: 13px;
	line-height: 1.31;
	text-transform: capitalize;
	width: 100%;

	${mq.md} {
		font-size: 12px;
		margin: 0 auto;
		text-align: center;
		width: 75%;
	}
`;

export const ProductCartCommerceName = styled('span')`
	border-radius: 5px;
	background-color: rgba(118, 118, 118, 0.09);
	color: ${getColor('black')};
	font-size: 13px;
	padding: 4px 12px;
	text-align: center;
	margin: 8px 0;
	width: 90%;

	${mq.md} {
		margin: 8px auto;
	}
`;

export const ProductPricesStyled = styled('div')`
	align-items: center;
	display: flex;
	margin: 10px 0 14px;

	${mq.md} {
		justify-content: center;
	}
`;

export const ProductPricesNow = styled('div')`
	color: ${getColor('black')};
	margin-right: 20px;

	.currency {
		font-size: 11px;
	}

	.value {
		font-size: 17px;
	}

	.decimal {
		font-size: 14px;
	}
`;

export const ProductPricesBefore = styled('div')`
	color: #494949;
	font-size: 11px;
	opacity: 0.53;
	text-decoration: line-through;
`;

export const ProductValorationStyled = styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;

	.sold {
		color: ${getColor('black')};
		border-radius: 5px;
		background: #f1f1f1;
		padding: 6px;
		font-size: 10px;
		margin-right: 4px;
	}

	${mq.md} {
		justify-content: center;

		.sold {
			padding: 6px 12px;
		}

		i[class^='icon-star'] {
			font-size: 13px;
		}
	}
`;
