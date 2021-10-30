import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Flex, Box } from 'reflexbox';
import { ProductCard } from 'components/ProductCard';
import { Product as ProductModel } from 'models/Product';
import {
	ORDER_BY_DISCOUNT,
	ORDER_BY_HIGHER_PRICE,
	ORDER_BY_LOWER_PRICE
} from 'Constants';
import { CommerceData } from 'models/Commerce';

type Props = {
	data: ProductModel[];
	commerceData: Partial<CommerceData>;
	category?: string;
	salPriceListId: number;
	orderBy: string;
};

const Products = ({
	data,
	commerceData,
	category,
	salPriceListId,
	orderBy,
}: Props) => {
	const [page, setPage] = useState<number>(1);
	const size = 10;
	const totalPages = Math.ceil(data.length / size);
	const [products, setProducts] = useState<ProductModel[]>([]);
	const [orderedProducts, setOrderedProducts] = useState<ProductModel[]>([]);

	const handleShowMore = () => {
		setPage((page) => page + 1);
	};

	const orderProducts = (orderBy: string) => {
		switch (orderBy) {
			case ORDER_BY_DISCOUNT: {
				const orderedProducts = [...products].sort((p1, p2) => {
					const d1 = p1.priceList[salPriceListId].discount;
					const d2 = p2.priceList[salPriceListId].discount;

					return d1 < d2 ? 1 : -1;
				});

				setOrderedProducts(orderedProducts);
				break;
			}
			case ORDER_BY_LOWER_PRICE: {
				const orderedProducts = [...products].sort((p1, p2) => {
					const price1 = p1.priceList[salPriceListId].price;
					const price2 = p2.priceList[salPriceListId].price;

					return price1 > price2 ? 1 : -1;
				});

				setOrderedProducts(orderedProducts);
				break;
			}
			case ORDER_BY_HIGHER_PRICE: {
				const orderedProducts = [...products].sort((p1, p2) => {
					const price1 = p1.priceList[salPriceListId].price;
					const price2 = p2.priceList[salPriceListId].price;

					return price1 < price2 ? 1 : -1;
				});

				setOrderedProducts(orderedProducts);
				break;
			}
		}
	};

	useEffect(() => {
		const newProducts = data.slice((page - 1) * size, page * size);
		setProducts((products) => [...products, ...newProducts]);
	}, [page]);

	useEffect(() => {
		if (products.length) {
			orderProducts(orderBy);
		}
	}, [orderBy, products]);

	return (
		<ProductsStyled>
			{category ? (
				<Flex mt={3} alignItems="center">
					<Box className="category bold capitalize">{category}</Box>
					<Box flex={1} className="bar" mx={16}></Box>
				</Flex>
			) : null}
			<Flex flexWrap="wrap" my={2} alignItems="stretch" mr={-13}>
				{orderedProducts.map((product: ProductModel, index: number) => (
					<Box
						key={`Products-item-${product.id}-${index}`}
						width={{
							_: 1,
							sm: 1 / 2,
							md: 1 / 3,
							lg: 1 / 4,
							xxl: 1 / 5
						}}
						pr={14}
						pt={10}
					>
						<ProductCard
							product={product}
							commerceData={commerceData}
							salPriceListId={salPriceListId}
						/>
					</Box>
				))}
			</Flex>
			{totalPages > page ? (
				<div className="center">
					<button
						className="show-more semi-bold upper"
						onClick={handleShowMore}
					>
						Ver más
					</button>
				</div>
			) : null}
		</ProductsStyled>
	);
};

const ProductsStyled = styled.section`
	margin-top: 18px;
	margin-bottom: 10px;
	padding-bottom: 50px;

	.category {
		color: ${(props: any) => props.theme.colors.black};
		font-size: 20px;
		font-weight: bold;
		padding: 0 20px;
	}

	.bar {
		background: #eee;
		height: 4px;
		width: 100%;
	}

	.center {
		margin-top: 25px;
	}

	.show-more {
		background: ${(props: any) => props.theme.colors.green};
		border-radius: 5px;
		border: solid 1px ${(props: any) => props.theme.colors.green};
		color: ${(props: any) => props.theme.colors.white};
		font-size: 12px;
		height: 38px;
		width: 119px;
	}
`;

export default Products;
