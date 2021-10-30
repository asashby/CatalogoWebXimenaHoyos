import getConfig from 'next/config';
import { ReactElement, useEffect, useState } from 'react';

import {
	HomeContainerStyled,
	CategoryGroup,
	CategoryGroupHeader,
	CategoryGroupTitle,
	CategoryGroupProducts,
	CategoryGroupProductWrapper,
	Bar
} from './HomeContainer.styles';

import Brands from 'components/Brands';
import { ProductCard } from 'components/ProductCard';
import { BannerSection } from './HomeContainer.components';
import MenuCategories from './MenuCategories';
import MypesSlider from './MypesSlider';
import ProductService from 'services/ProductService';
import { ProductsByCategory } from 'models/ProductsByCategory';
import { Button } from 'components/Button';
import { FavotireProduct } from 'models/FavotireProduct';
import { SHOW } from 'Constants';
import Loading from 'components/Loading';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

const showFavorites = applicationConfig.showFavorites === SHOW;

const productService = new ProductService();

const renderProductByCategory = (data: ProductsByCategory[], limit: number) => (
	<>
		{data.slice(0, limit).map((item) => (
			<CategoryGroup
				className="flex column fade-in"
				key={`Home-catalog-${item.name}`}
			>
				<CategoryGroupHeader className="flex row">
					<CategoryGroupTitle className="bold capitalize">
						{item.name.split('-').join(' ').replace('peru', 'perú')}
					</CategoryGroupTitle>
					<Bar />
				</CategoryGroupHeader>
				<CategoryGroupProducts className="flex row">
					{Object.keys(item.products).map((productKey) => (
						<CategoryGroupProductWrapper
							key={`Home-products-${productKey}`}
						>
							<ProductCard
								product={item.products[productKey]}
								showButton={false}
							/>
						</CategoryGroupProductWrapper>
					))}
				</CategoryGroupProducts>
			</CategoryGroup>
		))}
	</>
);

export const HomeContainer = (): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [productsByCategory, setProductsByCategory] = useState<
		ProductsByCategory[]
	>([]);
	const [favoriteProducts, setFavoriteProducts] = useState<FavotireProduct[]>(
		[]
	);
	const [limit, setLimit] = useState<number>(3);

	const handleShowMore = () => {
		setLimit((current) => current + 2);
	};

	useEffect(() => {
		(async () => {
			const [homeProducts, favoriteProducts] = await Promise.all([
				productService.getHomeProducts(),
				showFavorites ? productService.getFavoritesProducts() : []
			]);

			setProductsByCategory(
				[...homeProducts].sort(() => 0.5 - Math.random())
			);
			setFavoriteProducts(favoriteProducts);
			setIsLoading(false);
		})();
	}, []);

	return (
		<HomeContainerStyled className="flex column">
			<div className="flex row banner-section">
				<div className="menu-container">
					<MenuCategories />
				</div>
				<div className="container banner-container">
					<BannerSection
						favoriteProducts={favoriteProducts}
						showFavorites={showFavorites}
					/>
				</div>
			</div>
			{/* <MypesSlider mypes={commerces} title="Mejores calificadas" /> */}
			{isLoading ? (
				<Loading />
			) : (
				<>
					<section className="flex column">
						{productsByCategory
							? renderProductByCategory(productsByCategory, limit)
							: null}

						{limit < productsByCategory.length ? (
							<Button
								className="btn-show-more"
								variant="primary"
								onClick={handleShowMore}
							>
								VER MÁS
							</Button>
						) : null}
					</section>
					<Brands />
				</>
			)}
		</HomeContainerStyled>
	);
};
