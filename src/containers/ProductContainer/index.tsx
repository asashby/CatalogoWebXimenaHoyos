import { useContext, ReactElement } from 'react';
import styled from '@emotion/styled';
import { Flex, Box } from 'reflexbox';

import { AuthContext } from 'contexts/AuthContext';
import { Comments } from './Comments/Commets.component';
import { CommerceData } from 'models/Commerce';
import { getColor, mq } from 'styles/utils';
import { Product } from 'models/Product';
import { ProductSection } from './ProductSection';
import { ProductSection as ProductSectionModel } from 'models/ProductSection';

import { useRouter } from 'next/router';
import BannerSection from './BannerSection';
import RelatedProducts from './RelatedProducts';

type Props = {
	commerceData: CommerceData;
	product: Product;
};

const ProductContainer = ({ product, commerceData }: Props): ReactElement => {
	const { comments, sections = [], id, description } = product;
	const { settings, tokenStore, name, code, id: commerceId } = commerceData;
	const { user } = useContext(AuthContext);
	const { commerceSlug } = useRouter().query;

	return (
		<ProductContainerStyled className="flex column">
			<Flex flexDirection="column">
				<Box>
					<BannerSection
						product={product}
						salPriceListId={settings.salPriceListId}
						commerceData={{ name, code, id: commerceId, tokenStore }}
					/>
				</Box>
				<Box>
					<RelatedProducts productId={id} hash={tokenStore} />
				</Box>
			</Flex>
			{sections.map((section: ProductSectionModel) => (
				<ProductSection
					key={`ProductContainer-section-${section.id}`}
					productDescripcion={description}
					data={section}
				/>
			))}
			{comments ? (
				<Comments
					productId={id}
					hash={tokenStore}
					user={user}
					commerceSlug={commerceSlug}
				/>
			) : null}
		</ProductContainerStyled>
	);
};

const ProductContainerStyled = styled('main')`
	margin-top: 12px;

	${mq.xl} {
		margin-right: 12px;
	}

	.commerce-title {
		background: ${getColor('white')};
		color: ${getColor('red')};
		height: 58px;
	}
`;

export default ProductContainer;
