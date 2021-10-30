
export const getPriceWithoutDiscount = (price, discount) => {
	return discount
		? (price * ((100 - discount) / 100)).toFixed(2)
		: price.toFixed(2);
};

export const capitalize = (text) => {
	return text ? `${text[0].toUpperCase()}${text.slice(1)}` : text;
};

export const orderingProductsByCommerce = (cart) => {
	const cartByCommerce = cart.reduce((acc, item) => {
		const { nameCommerce } = item.product;
		const index = acc.findIndex(a => a.nameCommerce === nameCommerce);
		if (index > -1) {
			acc[index].cart = [].concat(item, acc[index].cart);
			return acc;
		}
		
		const addedToCart = [].concat(item);
		return acc.concat({ nameCommerce, cart: addedToCart });

	}, []);

	return cartByCommerce;
}
