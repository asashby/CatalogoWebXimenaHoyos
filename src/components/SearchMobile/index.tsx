import styled from '@emotion/styled';
import { Button } from 'components/Button';
import { ProductCard } from 'components/ProductCard';
import { Product } from 'models/Product';
import { ReactElement, useState, useEffect } from 'react';
import SearchService from 'services/SearchService';
import { getColor, mq } from 'styles/utils';

import {
	MobileWrapperModal,
	MobileContentModal,
	MobileHeaderModal
} from 'components/Common';
import Loading from 'components/Loading';

type Props = {
	show: boolean;
	close: () => void;
};

const searchService = new SearchService();

const producstNotFound = (query: string): ReactElement => (
	<ProducstNotFoundStyled>
		<SearchTitle className="not-found">
			No se encontraron productos
		</SearchTitle>
	</ProducstNotFoundStyled>
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

export const SearchMobile = ({ show = false, close }: Props): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [limit, setLimit] = useState<number>(10);
	const [notFound, setNotFound] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');
	const [products, setProducts] = useState<Product[]>([]);

	const handleChange = (evt): void => {
		setSearchValue(evt.target.value);
	};

	const handleSearch = ({ keyCode }): void => {
		if (keyCode === 13 && searchValue.length) {
			const trimedVal = searchValue.trim();
			search(`${trimedVal}`);
		}
	};

	const handleShowMore = () => {
		setLimit((current) => current + 10);
	};

	const handleClose = () => {
		close();
	};

	const search = async (query) => {
		setIsLoading(true);
		setNotFound(false);
		setProducts([]);

		try {
			const { q, commerceSlug } = query;
			const { data } = await searchService.searchProducts(
				q,
				commerceSlug
			);

			const keys = Object.keys(data);

			if (keys.length) {
				const _products = keys.map((key) => {
					return data[key];
				});

				setProducts(_products);
			} else {
				setNotFound(true);
			}
		} catch (err) {
			console.log('Error >', err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setNotFound(false);
		setProducts([]);
		setLimit(10);
		setIsLoading(false);
		setSearchValue('');
	}, [show]);

	return (
		<MobileWrapperModal className={`${show ? 'show' : ''}`}>
			<MobileContentModal>
				<MobileHeaderModal className="flex bold">
					<i className="icon-arrow mr-1" onClick={handleClose} />
					Buscador
				</MobileHeaderModal>
				<SearchStyled className="flex row search">
					<input
						value={searchValue}
						onChange={handleChange}
						placeholder="Buscar productos"
						onKeyUp={handleSearch}
					/>
					<span className="icon-search"></span>
				</SearchStyled>
				{isLoading ? <Loading /> : null}
				<div className="flex column">
					{products.length ? (
						<>
							<SearchTitle className="medium">
								Resultado de la busqueda
								<span className="semi-bold">{` "${searchValue}"`}</span>
							</SearchTitle>
							<SubCategoryProductList className="flex row">
								{renderProducts(products, limit)}
							</SubCategoryProductList>
						</>
					) : null}
					{notFound ? producstNotFound(searchValue) : null}

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
			</MobileContentModal>
		</MobileWrapperModal>
	);
};

const SearchStyled = styled('div')`
	border-radius: 5px;
	background-color: ${getColor('light_gray')};
	border: solid 1px rgba(118, 118, 118, 0.18);
	height: 48px;
	position: relative;
	margin: 20px 8px;
	overflow: hidden;
	width: calc(100% - 16px);

	input {
		display: flex;
		color: ${getColor('black')};
		background: ${getColor('white')};
		flex: 1;
		padding-left: 32px;
		font-size: 14px;
		height: 100%;
		width: 80%;

		${mq.md} {
			width: 50%;
		}
	}

	.icon-search {
		color: #000;
		font-size: 15px;
		position: absolute;
		left: 8px;
		top: calc(50% - 7.5px);
	}
`;

const SearchTitle = styled('h1')`
	color: ${getColor('black')};
	font-size: 16px;
	justify-content: flex-start;
	margin: 16px 8px;
	text-align: center;

	&.not-found {
		color: ${getColor('green')};
		margin-bottom: 3rem;
	}

	${mq.md} {
		font-size: 28px;
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

const ProducstNotFoundStyled = styled('div')`
	align-items: center;
	color: ${getColor('green')};
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;

	a {
		color: ${getColor('green')};
	}
`;
