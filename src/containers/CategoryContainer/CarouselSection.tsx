import { Flex, Box } from 'reflexbox';
import styled from '@emotion/styled';
import { MultiCarouselCategories } from 'components/Carousel';
import { getColor, mq } from 'styles/utils';
import { Product } from 'models/Product';
import { ReactElement } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ITEM = {
	description: 'Desc',
	id: 12,
	percentage: 10,
	price: 20,
	productId: 20,
	productName: 'Name',
	promotionTime: '',
	quantity: 2,
	salelink: '',
	endDate: '',
	startDate: ''
};

type CarouselSectionProps = {
	brand?: string;
	discount?: number;
	products: Product[];
	title: string;
	slug: string;
};

const CarouselSection = ({
	title,
	discount = null,
	brand = null,
	products,
	slug
}: CarouselSectionProps): ReactElement => {
	return (
		<div className="mb-4">
			<Title>
				<h2 className="mr-2 bold upper">{title}</h2>
			</Title>
			<Flex>
				<MainImage>
					<LazyLoadImage
						src={`/images/banners/subcategories/${slug}.png`}
						alt={title}
					/>
					{(discount || brand) && (
						<Content>
							{discount && (
								<Discount>
									<h3>{discount}%</h3>
									<p>dscto</p>
								</Discount>
							)}
							{brand && (
								<Brand>
									<p>
										en toda <br /> la marca
									</p>
									<img src={brand} alt={brand} />
								</Brand>
							)}
						</Content>
					)}
				</MainImage>
				<Box width={{ _: 1 }}>
					<MultiCarouselCategories products={products} />
				</Box>
			</Flex>
		</div>
	);
};

const Title = styled('div')`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 25px 0;

	h2 {
		font-size: 14px;
	}

	&::after {
		flex: 1;
		content: '';
		position: relative;
		height: 2px;
		background-color: ${getColor('black', 0.05)};
	}
`;

const MainImage = styled('div')`
	display: none;
	height: 356px;
	width: 206px;
	overflow: hidden;
	border-radius: 12px;
	position: relative;
	margin-right: 13px;
	color: ${getColor('white')};

	&::after {
		content: '';
		position: absolute;
		z-index: 2;
		background-color: ${getColor('black', 0.25)};
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	> img {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		max-height: 100%;
		max-width: 100%;
		object-fit: cover;
		object-position: center;
		z-index: 1;
	}

	${mq.lg} {
		display: block;
	}
`;

const Content = styled('div')`
	position: absolute;
	text-align: center;
	z-index: 3;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
`;

const Discount = styled('div')`
	font-size: 28px;
	font-weight: bold;
	margin-bottom: 20px;

	h3 {
		font-size: 40px;
	}
`;

const Brand = styled('div')`
	p {
		font-size: 14px;
		margin-bottom: 10px;
	}

	img {
		max-height: 24px;
	}
`;

export default CarouselSection;
