import { ReactElement, useState } from 'react';
import Link from 'next/link';

import styled from '@emotion/styled';
import { Product } from 'models/Product';
import { Button } from 'components/Button';
import { ProductCard } from 'components/ProductCard';
import { getColor, mq } from 'styles/utils';
import theme from 'theme/theme';

type Props = {
	products: Product[];
	query: string;
};

const producstNotFound = (query: string) => (
	<>
		<ProducstNotFoundStyled>
			<SearchTitle className="not-found">
				No se encontraron productos: {`"${query}"`}
			</SearchTitle>
			<Link href="/">
				<a>Regresar a pantalla principal</a>
			</Link>
		</ProducstNotFoundStyled>
	</>
);

const renderProducts = (products: Product[], limit: number) => (
	<>
		{products.slice(0, limit).map((product) => (
			<ProductWrapper key={`SearchContainer-products-${product.id}`}>
				<ProductCard product={product} showButton={false} />
			</ProductWrapper>
		))}
	</>
);

const SearchContainer = ({ products = [], query }: Props): ReactElement => {
	const [limit, setLimit] = useState<number>(10);

	const handleShowMore = () => {
		setLimit((current) => current + 10);
	};

	return (
		<SearchContainerStyled className="flex column">
			<div className="flex column">
				{products.length ? (
					<>
						<SearchTitle>
							Resultado de busqueda: {`"${query}"`}
						</SearchTitle>
						<SubCategoryProductList className="flex row">
							{renderProducts(products, limit)}
						</SubCategoryProductList>
					</>
				) : (
					producstNotFound(query)
				)}

				{limit <= products.length ? (
					<Button
						className="center btn-show-more"
						variant="primary"
						onClick={handleShowMore}
					>
						VER MÁS
					</Button>
				) : null}
			</div>
		</SearchContainerStyled>
	);
};

const ProducstNotFoundStyled = styled('div')`
	align-items: center;
	color: ${theme.colors.green};
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;

	a {
		color: ${theme.colors.green};
	}
`;

const SearchContainerStyled = styled('main')`
	justify-content: space-between;

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
	margin: 13px 0;

	${mq.sm} {
		margin-right: -10px;
	}

	${mq.md} {
		margin-right: -15px;
	}
`;

const ProductWrapper = styled('div')`
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

const SearchTitle = styled('h1')`
	text-align: left;
	justify-content: flex-start;
	font-size: 28px;
	color: ${getColor('black')};
	margin: 16px 8px;

	&.not-found {
		color: ${getColor('green')};
		margin-bottom: 3rem;
	}
`;

export default SearchContainer;
