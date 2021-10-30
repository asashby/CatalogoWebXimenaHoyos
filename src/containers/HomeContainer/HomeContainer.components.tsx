import Link from 'next/link';
import { ReactElement } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
	BannerSectionStyled,
	FavoriteProductItemStyled,
	FavoriteProductItemPicture,
	FavoriteProductItemName,
	InformationStyled,
	InformationMessage,
	InformationLogo,
	InformationText,
	InformationSocial,
	InformationContact,
	Bar
} from './HomeContainer.styles';

import { CONTACT_ITEMS, ITEMS, SOCIAL_ITEMS } from 'Constants';
import { SingleCarousel, MultiCarousel } from 'components/Carousel';
import { FavotireProduct } from 'models/FavotireProduct';

type FavoriteProductItemProps = {
	product: FavotireProduct;
};

const FavoriteProductItem = ({
	product
}: FavoriteProductItemProps): ReactElement => (
	<FavoriteProductItemStyled className="flex column">
		<Link
			href="/tienda/[commerceSlug]/[productSlug]"
			as={`/tienda/${product.commerceSlug}/${product.productSlug}`}
		>
			<FavoriteProductItemPicture className="pointer">
				<LazyLoadImage src={product.urlImage} alt={product.name} />
			</FavoriteProductItemPicture>
		</Link>
		<FavoriteProductItemName className="flex column regular">
			<span className="name capitalize truncate-2">
				{product.name.toLowerCase()}
			</span>
			<span className="price">S/{product.price.toFixed(2)}</span>
		</FavoriteProductItemName>
	</FavoriteProductItemStyled>
);

const Information = (): ReactElement => (
	<InformationStyled className="flex">
		<InformationMessage>
			<InformationLogo>
				<LazyLoadImage
					src="/images/logo-footer.png"
					srcSet="/images/logo-footer@2x.png 2x, /images/logo-footer@3x.png 3x"
					alt="Cómprale al Perú"
				/>
			</InformationLogo>
			<InformationText>
				Somos la primera aceleradora Ecommerce para MYPES. Las
				principales marcas del país se unen para ayudar y entrenar a las
				microempresas a vender en Internet de manera efectiva y segura.
			</InformationText>
			<InformationSocial className="flex row">
				Síguenos
				{SOCIAL_ITEMS.map((item) => (
					<a
						key={`Home-banner-social-item-${item.name}`}
						href={item.link}
						target="_blank"
						rel="noreferrer"
						aria-label={item.name}
					>
						<i className={`icon-${item.name}`} />
					</a>
				))}
			</InformationSocial>
		</InformationMessage>
		<InformationContact>
			{CONTACT_ITEMS.map((item) => (
				<li key={`Information-contact-item-${item.name}`}>
					<a href={item.link}>{item.value}</a>
				</li>
			))}
		</InformationContact>
	</InformationStyled>
);

type BannerSectionProps = {
	favoriteProducts: FavotireProduct[];
	showFavorites: boolean;
};

export const BannerSection = ({
	favoriteProducts,
	showFavorites
}: BannerSectionProps): ReactElement => (
	<BannerSectionStyled className="flex column">
		<div className="single-carousel-container">
			<SingleCarousel items={ITEMS} />
		</div>

		{showFavorites ? (
			<>
				<div className="flex row bestseller">
					<span className="bold">Productos más vendidos</span>
					<Bar />
				</div>
				<div className="multi-carousel-container">
					<MultiCarousel>
						{favoriteProducts.map((product) => (
							<FavoriteProductItem
								key={product.name}
								product={product}
							/>
						))}
					</MultiCarousel>
				</div>
			</>
		) : (
			<Information />
		)}
	</BannerSectionStyled>
);
