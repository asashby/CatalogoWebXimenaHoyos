import { ReactElement, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { SubCategory } from 'models/Category';
import CategoryService from 'services/CategoryService';
import { Product } from 'models/Product';
import { Button } from 'components/Button';
import { ProductCard } from 'components/ProductCard';
import { mq } from 'styles/utils';
import Brands from 'components/Brands';
import Loading from 'components/Loading';
import { ProductWrapper } from 'components/Common';

const categoryService = new CategoryService();

type Props = {
	categorySlug: string;
	subCategory: SubCategory;
};

const renderProductBySubCategory = (products: Product[], limit: number) => (
	<>
		{products.slice(0, limit).map((product) => (
			<ProductWrapper key={`SubCategory-products-${product.id}`}>
				<ProductCard product={product} showButton={false} />
			</ProductWrapper>
		))}
	</>
);

const SubCategoryContainer = ({
	categorySlug,
	subCategory
}: Props): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [products, setProducts] = useState<Product[]>([]);
	const [limit, setLimit] = useState<number>(12);

	const handleShowMore = () => {
		setLimit((current) => current + 12);
	};

	useEffect(() => {
		(async () => {
			const products = await categoryService.getProductBySubCategory(
				categorySlug,
				subCategory.slug
			);
			setProducts(products);
			setIsLoading(false);
		})();
	}, []);

	return (
		<SubCategoryContainerStyled className="flex column">
			{isLoading ? (
				<Loading />
			) : (
				<div className="flex column">
					<SubCategoryProductList className="flex row">
						{products
							? renderProductBySubCategory(products, limit)
							: null}
					</SubCategoryProductList>
					{limit < products.length ? (
						<Button
							className="center btn-show-more"
							variant="primary"
							onClick={handleShowMore}
						>
							VER MÁS
						</Button>
					) : null}
				</div>
			)}
			<Brands />
		</SubCategoryContainerStyled>
	);
};

const SubCategoryContainerStyled = styled('main')`
	justify-content: space-between;
	margin-top: 13px;

	button.btn-show-more {
		height: 38px;
		margin: 25px auto;
		width: 119px;
	}

	${mq.xl} {
		margin-right: 12px;
	}
`;

const SubCategoryProductList = styled('section')`
	flex-wrap: wrap;
	margin: 0;

	${mq.sm} {
		margin-right: -10px;
	}

	${mq.md} {
		margin-right: -15px;
	}
`;

export default SubCategoryContainer;
