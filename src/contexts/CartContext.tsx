import { createContext, ReactElement, useEffect, useState } from 'react';

import { CartProductItem } from 'models/CartProductItem';
import { Product } from 'models/Product';

export type CartContextProps = {
	addProductToCart: (
		product: Partial<Product>,
		quantity?: number,
		replace?: boolean
	) => void;
	clearCart: () => void;
	cart: CartProductItem[];
	getTotal: () => number;
	removeProduct: (productId: number) => void;
	shippingCost: number;
	updateShippingCost: (value: number) => void;
};

export const CartContext = createContext<CartContextProps | undefined>(
	undefined
);

type Props = {
	children: ReactElement;
};

const ContextProvider = ({ children }: Props) => {
	const [cart, setCart] = useState<CartProductItem[]>([]);
	const [shippingCost, setShippingCost] = useState<number>(0);

	const addProductToCart = (
		product: Partial<Product>,
		quantity = 1,
		replace = false
	): void => {
		setCart((current) => {
			let found = false;

			current.some((item: CartProductItem) => {
				found = item.product.id === product.id;

				return found;
			});

			if (found) {
				return current.map((item: CartProductItem) => {
					if (item.product.id === product.id) {
						return {
							...item,
							quantity: replace
								? quantity
								: item.quantity + quantity
						};
					}

					return item;
				});
			}

			return [...current, { product, quantity }];
		});
	};

	const removeProduct = (productId: number): void => {
		setCart((current) => {
			return current.filter(({ product }: CartProductItem) => {
				return product.id !== productId;
			});
		});
	};

	const clearCart = (): void => {
		setCart([]);
	}

	const getTotal = (): number => {
		const cartTotal = cart.reduce((total: number, item: CartProductItem) => {
			const { quantity, product } = item;

			return total + quantity * product.price;
		}, 0);

		return cartTotal;
	};

	const updateShippingCost = (value: number): void => {
		setShippingCost(value);
	}

	useEffect(() => {
		const savedCart = localStorage['cart'];

		if (savedCart) {
			setCart(JSON.parse(savedCart));
		}
	}, []);

	useEffect(() => {
		localStorage['cart'] = JSON.stringify(cart);
	}, [cart]);

	return (
		<CartContext.Provider
			value={{ addProductToCart, cart, getTotal, removeProduct, clearCart, shippingCost, updateShippingCost }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default ContextProvider;
