import styled from '@emotion/styled';

import { getColor, mq } from 'styles/utils';

export const HomeContainerStyled = styled('main')`
	justify-content: space-between;

	.banner-section {
		justify-content: space-between;
		margin-bottom: 9px;
		width: 100%;

		.menu-container {
			display: none;
		}

		.banner-container {
			background: ${getColor('white')};
			padding: 7px 10px 10px 5px;
			width: 100%;
		}
	}

	.explore-section {
		background: ${getColor('white')};
		flex-direction: column;
		margin: 10px 0 12px;
		padding: 16px 10px 10px;

		.bar-city {
			display: none;
		}

		.select {
			border-radius: 5px;
		}

		.title {
			color: ${getColor('red')};
			font-size: 14px;
			margin-bottom: 7px;
		}

		${mq.md} {
			flex-direction: row;
			padding: 12px 15px 12px 22px;
			margin-bottom: 6px;

			.bar-city {
				display: block;
			}

			.select {
				border-radius: 17px;
			}

			.title {
				margin-right: 14px;
			}
		}

		${mq.lg} {
			margin: 15px 0 17px;
		}
	}

	.select-city {
		background: ${getColor('white')};
		height: 58px;
		margin-bottom: 17px;
		margin-top: 15px;
	}

	.bar-city {
		border-top: 2px dotted ${getColor('red')};
		flex: 1;
		height: 2px;
		margin-left: 16px;
	}

	${mq.lg} {
		.banner-section {
			.menu-container {
				display: flex;
				width: 250px;
			}

			.banner-container {
				padding: 16px 18px 16px 17px;
				width: calc(100% - 263px);
			}
		}
	}

	${mq.xl} {
		margin-right: 12px;
	}

	button.btn-show-more {
		align-self: center;
		height: 38px;
		margin-bottom: 20px;
		width: 119px;
	}
`;

export const CategoryGroup = styled('div')`
	margin: 20px 0;
	width: 100%;
`;

export const CategoryGroupHeader = styled('div')`
	align-items: center;
	justify-content: center;
	margin-bottom: 16px;
	padding: 6px 0;

	${mq.md} {
		padding: 8px 16px;
	}
`;

export const CategoryGroupTitle = styled('h3')`
	color: ${getColor('black')};
	font-size: 20px;
`;

export const Bar = styled('hr')`
	background: #eeeeee;
	flex: 1;
	margin-left: 20px;
	height: 2px;
`;

export const CategoryGroupProducts = styled('div')`
	flex-wrap: wrap;
	margin: 13px 0;

	${mq.sm} {
		margin-right: -10px;
	}

	${mq.md} {
		margin-right: -15px;
	}
`;

export const CategoryGroupProductWrapper = styled('div')`
	margin-bottom: 10px;
	width: 100%;

	${mq.sm} {
		padding-right: 10px;
		width: 50%;
	}

	${mq.md} {
		padding-right: 15px;
		width: 33.33%;
	}

	${mq.lg} {
		width: 25%;
	}

	${mq.xxl} {
		width: 20%;
	}
`;

export const BannerSectionStyled = styled('section')`
	border-radius: 12px;
	width: 100%;

	.bestseller {
		align-items: center;
		margin: 22px -10px 23px 0;
		padding-left: 13px;

		span {
			color: ${getColor('black')};
			font-size: 16px;
			margin-right: 9px;
		}

		.bar {
			background: #eee;
			flex: 1;
			height: 2px;
			margin: 0 6px;
		}
	}

	.single-carousel-container {
		height: 145px;
	}

	.multi-carousel-container {
		margin: 0 -10px 12px -5px;
	}

	${mq.md} {
		.bestseller {
			margin: 18px 0 20px;
			padding-left: 0;

			span {
				font-size: 18px;
			}
		}

		.single-carousel-container {
			height: 235px;
		}
	}
`;

export const FavoriteProductItemStyled = styled('article')`
	margin-right: 16px;
	padding: 8px 6px;
	text-align: center;
	width: 110px;
	transition: all 0.25s linear;

	&:hover {
		background: ${getColor('light_gray')};
	}
`;

export const FavoriteProductItemPicture = styled('picture')`
	border-radius: 12px;
	display: inline-block;
	height: 105px;
	margin-bottom: 8px;
	overflow: hidden;
	width: 100%;

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
	}
`;

export const FavoriteProductItemName = styled('div')`
	align-items: center;
	color: ${getColor('black')};

	.name {
		font-size: 11px;
		margin-bottom: 4px;
	}

	.price {
		font-size: 12px;
	}
`;

export const InformationStyled = styled('div')`
	align-items: flex-start;
	flex-direction: column;
	margin-top: 16px;
	padding: 8px;
	width: 100%;

	${mq.md} {
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		padding: 12px;
	}

	${mq.lg} {
		margin-top: 0;
		padding: 30px;
	}
`;
export const InformationMessage = styled('div')`
	margin-bottom: 12px;
	width: 100%;

	${mq.md} {
		margin-bottom: 0;
		width: 55%;
	}
`;
export const InformationLogo = styled('picture')`
	height: 42px;
	width: 225px;

	img {
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
		object-position: center;
	}
`;
export const InformationText = styled('p')`
	color: #8b8b8b;
	font-size: 12px;
	line-height: normal;
	margin: 24px 0 20px;
	text-align: justify;
`;

export const InformationSocial = styled('div')`
	align-items: center;
	color: ${getColor('black')};
	font-size: 10px;

	a {
		color: #494949;
	}

	[class^='icon-'] {
		border-radius: 50%;
		border: 1px solid #494949;
		font-size: 28px;
		margin-left: 6px;
		margin-right: 6px;
	}
`;
export const InformationContact = styled('ul')`
	list-style: none;

	li {
		margin: 4.5px 0;

		a {
			color: #8b8b8b;
			font-size: 13px;
		}
	}
`;
