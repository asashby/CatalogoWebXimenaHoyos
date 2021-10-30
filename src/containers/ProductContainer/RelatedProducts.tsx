import styled from '@emotion/styled';
import { MultiProductsCarousel } from 'components/Carousel';
import { useEffect, useState } from 'react';
import { Flex, Box } from 'reflexbox';
import RelatedProductsService from 'services/RelatedProducts';
import { getColor } from 'styles/utils';

const relatedProductsService = new RelatedProductsService();

type RelatedProductsProps = {
	hash: string;
	productId: number;
};

const RelatedProducts = ({ hash, productId }: RelatedProductsProps) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const products = await relatedProductsService.getRelatedProducts(
					productId,
					hash
				);
			} catch (err) {
				console.log('Error:', err);
			}
		})();
	}, []);

	if (!products.length) {
		return null;
	}

	return (
		<RelatedProductsStyled className="container flex column">
			<Flex flexDirection="column" width={1}>
				<Box>
					<Flex
						px={22}
						justifyContent="space-between"
						alignItems="center"
					>
						<h3 className="title bold">Productos relacionados</h3>
						<div className="bar flex"></div>
					</Flex>
				</Box>
				<Box width={{ _: 1 }} mt={4}></Box>
			</Flex>
		</RelatedProductsStyled>
	);
};

const RelatedProductsStyled = styled('div')`
	background: ${getColor('white')};
	padding: 28px 0 36px;
	margin-top: 24px;

	.bar {
		height: 2px;
		flex: 1;
		background: #eee;
	}

	.title {
		margin-right: 16px;
	}
`;

export default RelatedProducts;
