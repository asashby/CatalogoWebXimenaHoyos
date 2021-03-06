import { CartProductItem } from 'models/CartProductItem';
import { FormDataType } from 'models/Order';

import { FlagPickUpOptions, PaymentMethodsOptions } from './orderEnums';
import { orderingProductsByCommerce } from './utils';

interface WhatsAppMessageType {
    currencySymbol: string;
	formData: FormDataType;
	isDelivery: boolean;
	cart: CartProductItem[];
	total: number;
	placesCoords?: any; 
	shippingCost?: number;
}

const transformProducts = (products, currencySymbol) => {
    const len = products.length;

    if (len === 1) {
        const { cart } = products[0];
        return cart.reduce((acc, p) => {
            const { quantity, product } = p;
            const inline = `Cant.: ${quantity}, Precio Unitario: ${currencySymbol}${product.price}......${product.name} \n`;
            const newA = acc.concat(inline);
            return newA;
        }, '');
    }

    return products.reduce((acc, { nameCommerce, cart }) => {
        const productsInLine = cart.reduce((a, p) => {
            const { quantity, product } = p;
            const inline = `Cant.: ${quantity}, Precio Unitario: ${currencySymbol}${product.price}......${product.name} \n`;
            const newA = a.concat(inline);
            return newA;
        }, '')
        return acc.concat(`Tienda *${nameCommerce.trim()}*\n${productsInLine}\n`);
    }, '');
}

export const getPaymentMethod = (paymentType: string) => {
	const { name } = PaymentMethodsOptions.find((payment) => payment.code === paymentType);
	return name;
};

export const getWhatsAppMsg = ({
	currencySymbol,
	formData,
	isDelivery,
	cart,
	total,
	placesCoords,
	shippingCost
}: WhatsAppMessageType) => {
	const products = orderingProductsByCommerce(cart);
	const productsParsed = transformProducts(products, currencySymbol);
	const paymentMethodName = getPaymentMethod(formData.paymentType);
	const payment = `Forma de pago: ${paymentMethodName}`;
	const name = `Nombre: ${formData.name} ${formData.lastname}`;
	const phone = `📞: ${formData.phone}`;
	const address = `Dirección: ${isDelivery? formData.address : formData.warehouse.address}`;
	const deliveryType = isDelivery ? FlagPickUpOptions.home.name : FlagPickUpOptions.store.name;
	const deliveryCoords = isDelivery ? `https://google.com/maps/dir//${placesCoords.lat},${placesCoords.lng}` : null;
	const delivery = `Tipo de entrega: ${deliveryType} ${isDelivery ? (deliveryCoords) : null}`;
	const deliveryCost = `Costo de envio: ${isDelivery ? shippingCost : 0}`;
	const additionalInformation = `Información adicional: ${formData.additionalInformation}`;
	const dataInfo = `${name}\n${phone}\n${address}\n${payment}\n${delivery}\n${deliveryCost}\n${additionalInformation}`;
	const productsInline = `🛍 *Productos:*\n\n${productsParsed}`;
	const subtotal = `Subtotal de pedido: ${currencySymbol}${(total).toFixed(2)}`;
	const amount = `*TOTAL DE PEDIDO: ${currencySymbol}${(total + (shippingCost || 0)).toFixed(2)}*`;
	const finalMessage = `¡Hola! 👋  tienes un nuevo pedido 🛒 \n\n ============================== \n${dataInfo}\n ============================= \n\n ${productsInline}\n\n ${subtotal}\n ${deliveryCost}\n ${amount}`;
	return encodeURIComponent(finalMessage);
}

export const getWhatsappLink = (phone: string) => {

	const mobile = {
		Android() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		isMobile() {
			return (mobile.Android() || mobile.BlackBerry() || mobile.iOS() || mobile.Opera() || mobile.Windows());
		}
	};

	const mobileLink = `https://api.whatsapp.com/send?phone=${phone}`;
	const webLink = `https://web.whatsapp.com/send?phone=${phone}`;

	return mobile.isMobile() ? mobileLink : webLink;
}
