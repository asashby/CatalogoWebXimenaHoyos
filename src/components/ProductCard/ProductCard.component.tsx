import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Product } from 'models/Product';
import {
	ProductCardStyled,
	ProductCardPictureWrapper,
	ProductCardPicture,
	ProductCardViewer,
	ProductCardDetail,
	ProductCardTitle,
	ProductPricesStyled,
	ProductPricesNow,
	ProductPricesBefore,
	ProductValorationStyled,
	ProductCartCommerceName
} from './ProductCart.styles';
import { Button } from 'components/Button';
import { HAS_VARIATIONS } from 'Constants';
import { getPriceWithoutDiscount } from 'utils/utils';
import { Rating } from 'components/Rating';
import { ReactElement, useContext, useRef } from 'react';
import { CartContext, CartContextProps } from 'contexts/CartContext';
import Discount from 'components/Discount';
import { CommerceData } from 'models/Commerce';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

const currency = JSON.parse(applicationConfig.currency);

type ProductValorationProps = {
	rating: number;
};

export const ProductValoration = ({
	rating
}: ProductValorationProps): ReactElement => (
	<ProductValorationStyled>
		<Rating value={rating} size={11} />
	</ProductValorationStyled>
);

type ProductPricesProps = {
	price: number;
	priceOld: number;
	discount: number;
};

export const ProductPrices = ({
	price,
	priceOld,
	discount
}: ProductPricesProps): ReactElement => {
	const [value, decimal] = parseFloat(price.toString()).toFixed(2).split('.');

	return (
		<ProductPricesStyled>
			<ProductPricesNow className="extra-bold">
				<span className="currency">{currency.symbol}</span>
				<span className="value">
					{value}
					{'.'}
				</span>
				<span className="decimal">{decimal}</span>
			</ProductPricesNow>
			{discount ? (
				<ProductPricesBefore className="medium">
					S/{priceOld.toFixed(2)}
				</ProductPricesBefore>
			) : null}
		</ProductPricesStyled>
	);
};

type ProductCardPorps = {
	commerceData?: Partial<CommerceData>;
	product: Product;
	salPriceListId?: number;
	showButton?: boolean;
};

export const ProductCard = ({
	commerceData = {},
	product,
	salPriceListId,
	showButton = true
}: ProductCardPorps): ReactElement => {
	const { addProductToCart }: CartContextProps = useContext(CartContext);
	const refPlaceholder = useRef(null);
	const {
		urlImage = '',
		slug,
		priceList,
		name,
		rating,
		type,
		stock,
		commerceName = ''
	} = product;
	const {
		code,
		id: commerceId,
		name: nameCommerce,
		slug: commerceSlug,
		tokenStore: hashCommerce,
	} = commerceData;
	const productDetailURL = `/tienda/${
		commerceSlug ? commerceSlug : product.commerceSlug
	}/${slug}`;

	const { price, discount } = salPriceListId
		? priceList[salPriceListId]
		: priceList[Object.keys(priceList)[0]];
	const newPrice = getPriceWithoutDiscount(price, discount);

	const removePlaceholder = () => {
		if (refPlaceholder) {
			refPlaceholder.current.remove();
		}
	};

	const handleAdd = () => {
		const { description, id, unitId, warehouseProduct, weigth } = product;

		addProductToCart({
			commerceId,
			codeCommerce: code,
			description,
			hashCommerce,
			id,
			name,
			nameCommerce,
			stock,
			price: newPrice,
			priceListId: salPriceListId,
			unitId,
			urlImage,
			warehouseId: warehouseProduct?.warehouseId || 0,
			weigth
		});
	};

	const newUrlImage = `https://res.cloudinary.com/dfrpp7bta/image/fetch/w_auto,h_300/${urlImage}`;

	return (
		<ProductCardStyled className="fade-in">
			{discount ? <Discount value={discount} left /> : null}
			<ProductCardPictureWrapper>
				<ProductCardPicture className="flex">
					{urlImage ? (
						<Link
							href="/tienda/[commerceSlug]/[productSlug]"
							as={productDetailURL}
						>
							<LazyLoadImage
								className="pointer"
								src={newUrlImage}
								alt={name}
							/>
						</Link>
					) : (
						<Link
							href="/tienda/[commerceSlug]/[productSlug]"
							as={productDetailURL}
						>
							<div>
								<img
									className="pointer no-image"
									src="/images/logo@3x.png"
									alt={name}
								/>
							</div>
						</Link>
					)}
				</ProductCardPicture>
				<ProductCardViewer className="view-detail pointer">
					<Link
						href="/tienda/[commerceSlug]/[productSlug]"
						as={productDetailURL}
					>
						<i className="icon-view"></i>
					</Link>
				</ProductCardViewer>
			</ProductCardPictureWrapper>

			<ProductCardDetail>
				<Link
					href="/tienda/[commerceSlug]/[productSlug]"
					as={productDetailURL}
				>
					<ProductCardTitle className="regular pointer truncate-2">
						{name.toLowerCase()}
					</ProductCardTitle>
				</Link>
				<ProductPrices
					price={newPrice}
					priceOld={price}
					discount={discount}
				/>
				{commerceName ? (
					<Link
						href="/tienda/[commerceSlug]"
						as={`/tienda/${product.commerceSlug}`}
					>
						<ProductCartCommerceName className="medium capitalize pointer">
							{commerceName.toLowerCase()}
						</ProductCartCommerceName>
					</Link>
				) : null}
				<ProductValoration rating={rating} />
				{showButton ? (
					type === HAS_VARIATIONS ? (
						<Link
							href="/tienda/[commerceSlug]/[productSlug]"
							as={productDetailURL}
						>
							<Button
								variant="secondary"
								className="upper semi-bold"
							>
								Elige tus opciones
							</Button>
						</Link>
					) : (
						<Button
							variant="secondary"
							className="upper semi-bold"
							onClick={handleAdd}
						>
							Agregar a carrito
						</Button>
					)
				) : null}
			</ProductCardDetail>
		</ProductCardStyled>
	);
};
