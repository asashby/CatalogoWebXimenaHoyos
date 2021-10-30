import Link from 'next/link';
import { ReactElement } from 'react';
import styled from '@emotion/styled';

import { getColor, mq } from 'styles/utils';
import { ITEMS } from 'Constants';
import { SingleCarousel, MultiCarousel } from 'components/Carousel';
import { SubCategory } from 'models/Category';

type SubCategoryItemProps = {
	subCategory: SubCategory;
	categorySlug: string;
};

const SubCategoryItem = ({
	categorySlug,
	subCategory
}: SubCategoryItemProps): ReactElement => (
	<SubCategoryItemPropsStyled className="flex column">
		<Link
			href="/categoria/[categorySlug]/[subcategorySlug]"
			as={`/categoria/${categorySlug}/${subCategory.slug}`}
		>
			<SubCategoryItemPicture className="pointer">
				<img
					src={`/images/subcategorias/${subCategory.slug}.png`}
					alt={subCategory.name}
				/>
			</SubCategoryItemPicture>
		</Link>
		<SubCategoryItemName>{subCategory.name}</SubCategoryItemName>
	</SubCategoryItemPropsStyled>
);

type BannerSectionProps = {
	categorySlug: string;
	subCategories: SubCategory[];
};

const BannerSection = ({
	categorySlug,
	subCategories
}: BannerSectionProps): ReactElement => (
	<BannerSectionStyled className="flex column">
		<div className="single-carousel-container">
			<SingleCarousel items={ITEMS} />
		</div>
		<div className="flex row bestseller">
			<span className="bold">Sub categorias</span>
			<div className="bar"></div>
		</div>
		<MultiCarousel>
			{subCategories.map((subCategory) => (
				<SubCategoryItem
					key={`BannerSection-multicarousel-item-${subCategory.name}`}
					categorySlug={categorySlug}
					subCategory={subCategory}
				/>
			))}
		</MultiCarousel>
	</BannerSectionStyled>
);

const BannerSectionStyled = styled('section')`
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

const SubCategoryItemPropsStyled = styled('article')`
	justify-content: center;
	margin-right: 16px;
	padding: 8px 6px;
	text-align: center;
	transition: all 0.25s linear;
	width: 110px;

	&:hover {
		background: ${getColor('light_gray')};
	}
`;

const SubCategoryItemPicture = styled('picture')`
	border-radius: 12px;
	display: inline-block;
	height: 55px;
	margin-bottom: 8px;
	overflow: hidden;
	width: 100%;

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
	}
`;
const SubCategoryItemName = styled('h3')`
	color: ${getColor('black')};
	font-size: 13px;
	line-height: 1.08;
	text-align: center;
`;
export default BannerSection;
