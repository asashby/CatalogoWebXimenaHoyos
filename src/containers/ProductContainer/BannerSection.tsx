import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Discount from 'components/Discount';
import { CommerceData } from 'models/Commerce';
import { PriceInfo } from 'models/PriceInfo';
import { Product } from 'models/Product';

import { Flex, Box } from 'reflexbox';
import { getColor, mq } from 'styles/utils';
import { ProductDetail } from './ProductDetail';
import ErrorContainer from 'container/ErrorContainer';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type Props = {
	commerceData: Partial<CommerceData>;
	product: Product;
	salPriceListId: number | string;
};

const BannerSection = ({ commerceData, salPriceListId, product }: Props) => {
	const [isLoading, setIsLoading] = useState(true);
	const { images = [], priceList, name } = product;
	const [imageIndex, setImageIndex] = useState<number>(0);
	const [imagesProduct, setImagesProduct] = useState<Array<any>>([]);
	let priceInfo: PriceInfo;

	try {
		priceInfo = salPriceListId
			? priceList[salPriceListId]
			: priceList[Object.keys(priceList)[0]];
	} catch (err) {
		return (
			<ErrorContainer
				statusCode={500}
				title="Producto no disponible"
				message="Lo sentimos, este producto no se encuentra disponible."
			/>
		);
	}

	const handleChangeImage = (e) => {
		const index = +e.target.getAttribute('data-index');
		setImageIndex(index);
	};

	useEffect(() => {
		if (product.type !== 5) {
			setIsLoading(false);
			setImagesProduct(images);
		}
	}, []);

	useEffect(() => {
		if (imagesProduct && imagesProduct.length) {
			setImageIndex(0);
		}

		if (isLoading) {
			setIsLoading(false);
		}
	}, [imagesProduct]);

	return (
		<BannerSectionStyled className="container flex column">
			<Box height="100%">
				{isLoading && (
					<div className="center loading">
						<span className="semi-bold">Cargando...</span>
					</div>
				)}
				<Flex
					flexDirection={{ _: 'column', md: 'row' }}
					justifyContent="space-between"
					alignItems="stretch"
					height="100%"
				>
					<Box width={{ _: 1, md: 1 / 2 }} mr={30}>
						{isLoading ? null : (
							<>
								<div className="cover center fade-in">
									{priceInfo.discount ? (
										<Discount
											value={priceInfo.discount}
											right
										/>
									) : null}
									{imagesProduct ? (
										<picture>
											<LazyLoadImage
												src={
													imagesProduct[imageIndex]
														?.urlImage
												}
												alt={name}
											/>
										</picture>
									) : null}
								</div>
								<div className="images flex row">
									{imagesProduct &&
										imagesProduct.map((image, index) => (
											<div
												key={`BannerSection-images-${index}`}
												className={`image-container center pointer ${
													index === imageIndex
														? 'active'
														: ''
												}`}
											>
												<img
													src={image.urlImage}
													onClick={handleChangeImage}
													data-index={index}
													alt={`${name} image-${index}`}
												/>
											</div>
										))}
								</div>
							</>
						)}
					</Box>

					<Box className="detail fade-in" width={{ _: 1, md: 1 / 2 }}>
						<ProductDetail
							commerceData={commerceData}
							product={product}
							setImages={setImagesProduct}
							salPriceListId={salPriceListId}
						/>
					</Box>
				</Flex>
			</Box>
		</BannerSectionStyled>
	);
};

const BannerSectionStyled = styled('section')`
	background: ${getColor('white')};
	padding: 16px 16px 32px;
	min-height: 360px;
	width: 100%;

	.loading {
		font-size: 18px;
		height: 360px;
		width: 100%;
	}

	.cover {
		padding: 16px;
		position: relative;
		height: 200px;

		${mq.md} {
			height: 300px;
		}

		picture {
			width: 100%;
			height: 100%;
			text-align: center;
			margin-bottom: 10px;

			img {
				height: 100%;
				max-width: 100%;
				object-fit: contain;
			}

			${mq.md} {
				width: 80%;
			}
		}
	}

	.images {
		height: 90px;
		justify-content: center;

		.image-container {
			width: 90px;
			height: 90px;
			border-radius: 12px;
			overflow: hidden;
			margin-right: 20px;
			align-items: center;
			transition: 0.25s all linear;
			border: 3px solid transparent;

			&.active {
				border-color: ${getColor('green')};
			}
		}

		img {
			height: auto;
			transform: scale(0.9);
		}
	}

	.detail {
		justify-content: space-between;
		padding: 25px;
		${mq.lg} {
			padding: 50px;
		}
	}
`;

export default BannerSection;
