import { ReactElement, useEffect, useState } from 'react';

import {
	CartItemStyled,
	CartItemMobileStyled,
	CartProductItemActionsStyled
} from './Cart.styles';
import { CartProductItem } from 'models/CartProductItem';
import is from 'ramda/src/is';
import { Product } from 'models/Product';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

const currency = JSON.parse(applicationConfig.currency);

type CartItemProps = {
	cartItem: CartProductItem;
	removeItem: (productId: number) => void;
};

export const CartItem = ({
	cartItem,
	removeItem
}: CartItemProps): ReactElement => {
	const { product, quantity } = cartItem;
	const { urlImage, name, price } = product;

	const handleRemove = () => {
		removeItem(product.id);
	};

	return (
		<CartItemStyled className="flex row fade-in">
			<picture className="center">
				{urlImage ? <img src={urlImage} alt={name} /> : null}
			</picture>
			<div className="flex column product-name">
				<span className="name capitalize regular truncate-1">
					{name.toLowerCase()}
				</span>
				<span className="bold">{currency.symbol}{price}</span>
				<span className="bold product-quantity">{quantity}</span>
			</div>
			<span className="remove-item medium pointer" onClick={handleRemove}>
				x
			</span>
		</CartItemStyled>
	);
};

type CartProductItemActionsProps = {
	addToCart: (quantity: number) => void;
	maxValue: number;
	value?: number;
};

const CartProductItemActions = ({
	value = 0,
	maxValue,
	addToCart
}: CartProductItemActionsProps): ReactElement => {
	const [quantity, setQuantity] = useState(value);

	const handleChangeQuantity = (evt): void => {
		const value = parseInt(evt.target.value, 10);

		if (value && is(Number, value) && value <= maxValue) {
			setQuantity(value);
		} else if (!value) {
			setQuantity(0);
		} else {
			evt.preventDefault();
		}
	};

	const handleUpdateQuantity = (evt): void => {
		const value = parseInt(evt.target.getAttribute('data-value'), 10);

		setQuantity((current) => {
			const newValue = current + value;

			return newValue <= maxValue && newValue >= 0 ? newValue : current;
		});
	};

	useEffect(() => {
		addToCart(quantity);
	}, [quantity]);

	return (
		<CartProductItemActionsStyled className="flex row">
			<input
				type="text"
				value={quantity}
				onChange={handleChangeQuantity}
			/>
			<div className="flex column">
				<button
					data-value="1"
					disabled={quantity === maxValue}
					onClick={handleUpdateQuantity}
				>
					+
				</button>
				<button
					data-value="-1"
					disabled={!quantity}
					onClick={handleUpdateQuantity}
				>
					-
				</button>
			</div>
		</CartProductItemActionsStyled>
	);
};

type CartItemMobileProps = {
	cartItem: CartProductItem;
	removeItem: (productId: number) => void;
	updateItem: (
		product: Partial<Product>,
		quantity: number,
		repalce?: boolean
	) => void;
};

export const CartItemMobile = ({
	cartItem,
	removeItem,
	updateItem
}: CartItemMobileProps): ReactElement => {
	const { product, quantity } = cartItem;
	const { urlImage, name, price, nameCommerce } = product;

	const handleRemove = () => {
		removeItem(product.id);
	};

	const handleAddToCart = (quantity) => {
		updateItem(product, quantity, true);
	};

	return (
		<CartItemMobileStyled className="flex column">
			<div className="flex row">
				<picture className="center">
					{urlImage ? <img src={urlImage} alt={name} /> : null}
				</picture>
				<div className="info flex column">
					<span className="product-name capitalize medium">
						{name.toLowerCase()}
					</span>
				</div>
			</div>
			<div className="flex row price">
				<CartProductItemActions
					value={quantity}
					addToCart={handleAddToCart}
					maxValue={product.stock}
				/>
				<span className="semi-bold amount">{currency.symbol} {price}</span>
			</div>
			<hr />
			<span className="remove-item medium pointer" onClick={handleRemove}>
				Eliminar
			</span>
		</CartItemMobileStyled>
	);
};
