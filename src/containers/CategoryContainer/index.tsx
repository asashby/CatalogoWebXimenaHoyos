import { ReactElement, useEffect, useState, useMemo } from 'react';
import styled from '@emotion/styled';

import { getColor, mq } from 'styles/utils';
import Menu from './Menu';
import BannerSection from './BannerSection';
import Brands from 'components/Brands';
import CarouselSection from './CarouselSection';
import { Category } from 'models/Category';
import CategoryService from 'services/CategoryService';
import { Product } from 'models/Product';
import { useRouter } from 'next/router';
import Loading from 'components/Loading';

const carouselSectiionProps = {
	title: 'PERU MODA',
	discount: 50,
	brand: {
		name: 'forever',
		image: 'https://i.dlpng.com/static/png/393721_preview.png'
	}
};

const categoryService = new CategoryService();

type ProductBySubcategory = {
	[key: string]: {
		name: string;
		products: Product[];
	};
};

type Props = {
	category: Category;
};

const CategoryContainer = ({ category }: Props): ReactElement => {
	const { query } = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [products, setProducts] = useState<Product[]>([]);
	const { slug, subCategories } = category;

	const productsBySubCategory: ProductBySubcategory = useMemo(() => {
		const grouped: ProductBySubcategory = {};

		products.forEach((product) => {
			if (grouped[product.subItemSlug]) {
				grouped[product.subItemSlug].products.push(product);
			} else {
				grouped[product.subItemSlug] = {
					name: product.subItemSlug.split('-').join(' '),
					products: [product]
				};
			}
		});

		return grouped;
	}, [products]);

	useEffect(() => {
		setIsLoading(true);

		(async () => {
			const result = await categoryService.getProductByCategory(slug);
			setProducts(result);
			setIsLoading(false);
		})();
	}, [query.categorySlug]);

	return (
		<CategoryContainerStyled className="flex column">
			<div className="flex row banner-section">
				<div className="menu-container">
					<Menu data={category} />
				</div>
				<div className="container banner-container">
					<BannerSection
						categorySlug={slug}
						subCategories={subCategories}
					/>
				</div>
			</div>
			{isLoading ? (
				<Loading />
			) : (
				Object.keys(productsBySubCategory).map((key) => (
					<CarouselSection
						slug={key}
						title={productsBySubCategory[key].name}
						key={`CategoryContainer-carousel-item-${key}`}
						products={productsBySubCategory[key].products}
					/>
				))
			)}
			<Brands />
		</CategoryContainerStyled>
	);
};

const CategoryContainerStyled = styled('main')`
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

	${mq.md} {
		.banner-container {
			padding: 16px 14px 16px 21px;
		}
	}

	${mq.lg} {
		.banner-section {
			.banner-container {
				padding: 16px 18px 16px 17px;
				width: calc(100% - 263px);
			}

			.menu-container {
				display: flex;
				width: 250px;
			}
		}
	}

	${mq.xl} {
		margin-right: 12px;
	}
`;

export default CategoryContainer;
