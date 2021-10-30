import Link from 'next/link';

export interface Item {
	id: string;
	source?: string;
	title?: string;
	subTitle?: string;
	description?: string;
	brandLogo?: string;
	brandName?: string;
	webImage?: string;
	link?: string;
}

import Discount from 'components/Discount';
import {
	SingleCarouselItemPicture,
	SingleCarouselItemPictureInMicrosite,
	MultiCarouselItemWrapper,
	MultiCarouselItemPicture,
	MultiCarouselItemDetails,
	MultiCarouselItemTitle,
	MultiCarouselItemSubTitle,
	MultiProductCarouselItemWrapper,
	MultiProductCarouselItemButton,
	MultiProductCarouselItemPicture,
	MultiProductCarouselItemDetails,
	MultiProductCarouselItemTitle,
	MultiProductCarouselItemPrice,
	MultiProductCarouselItemSold
} from './Carousel.styles';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

export const SingleCarouselItem = ({
	title,
	description,
	webImage,
	link
}: Item) => {
	const route = useRouter();
	const isMicrositeRoute = route.pathname.includes('tienda');
	return (
		<>
			{isMicrositeRoute ? (
				<SingleCarouselItemPictureInMicrosite>
					<LazyLoadImage
						src={webImage}
						alt={`${title} ${description}`}
					/>
				</SingleCarouselItemPictureInMicrosite>
			) : (
				<SingleCarouselItemPicture>
					{link ? (
						<Link href={link}>
							<LazyLoadImage
								className="pointer"
								src={webImage}
								alt={`${title} ${description}`}
							/>
						</Link>
					) : (
						<LazyLoadImage
							src={webImage}
							alt={`${title} ${description}`}
						/>
					)}
				</SingleCarouselItemPicture>
			)}
		</>
	);
};

type MultiCarouselItemProps = {
	item: Item;
};

export const MultiCarouselItem = ({ item }: MultiCarouselItemProps) => {
	const { webImage, title, subTitle } = item;

	return (
		<MultiCarouselItemWrapper>
			<MultiCarouselItemPicture>
				<img src={webImage} alt={`${title} ${subTitle}`} />
			</MultiCarouselItemPicture>
			<MultiCarouselItemDetails>
				<MultiCarouselItemTitle
					dangerouslySetInnerHTML={{ __html: title }}
				/>
				<MultiCarouselItemSubTitle
					dangerouslySetInnerHTML={{ __html: subTitle }}
				/>
			</MultiCarouselItemDetails>
		</MultiCarouselItemWrapper>
	);
};

export const MultiProductsCarouselItem = ({
	productName,
	price,
	percentage
}) => {
	const { currency } = applicationConfig;
	return (
		<MultiProductCarouselItemWrapper className="flex row pointer">
			<MultiProductCarouselItemButton className="semi-bold upper fade-in">
				Comprar ahora
			</MultiProductCarouselItemButton>
			<MultiProductCarouselItemPicture>
				<Discount
					value={percentage * 100}
					right
					style={{ right: 0, top: 0, width: 62 }}
				/>
				<img
					src="https://placeimg.com/200/200/tech"
					alt="Placeholder"
				/>
			</MultiProductCarouselItemPicture>
			<MultiProductCarouselItemDetails className="flex column">
				<MultiProductCarouselItemTitle
					className="capitalize"
					dangerouslySetInnerHTML={{
						__html: productName.toLowerCase()
					}}
				/>
				<MultiProductCarouselItemPrice
					className="semi-bold"
					dangerouslySetInnerHTML={{
						__html: `${currency.symbol} ${price.toFixed(2)}`
					}}
				/>
				<MultiProductCarouselItemSold
					dangerouslySetInnerHTML={{
						__html: `100 vendidos`
					}}
				/>
			</MultiProductCarouselItemDetails>
		</MultiProductCarouselItemWrapper>
	);
};
