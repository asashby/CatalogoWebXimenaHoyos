import getConfig from 'next/config';

import BaseHttpService from 'services/BaseHttpService';

import { CartProductItem } from 'models/CartProductItem';
import { FormDataType } from 'models/Order';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

class PreOrderService extends BaseHttpService {
	readonly API_PRE_ORDER = '/pre-order';
	readonly API_ORDER_MIDDLEWARE = '/order-middleware';
	readonly COMPANY_TOKEN = applicationConfig.companyToken;

	constructor() {
		super(applicationConfig.salesService);
	}

	processOrderMiddleware = async (
		cart: CartProductItem[],
		formData: FormDataType,
		shippingCost?: number,
	) => {

		const products = [...cart].map(
			({ product, quantity }: CartProductItem) => {
				delete product.stock;

				return { ...product, quantity };
			}
		);

		const {
			address,
			additionalInformation,
			codeTypeDelivery,
			name,
			lastname,
			locationCoords,
			phone,
			paymentType: codeTypePayment
		} = formData;

		const data = {
			isNotLogged: true,
			order: {
				additionalInformation: {
					address,
					additionalInformation,
					locationCoords
				},
				codeTypeDelivery,
				codeTypePayment,
				customer: {},
				makiId: null,
				orderCode: 0,
				origin: 'web',
				products,
				responsiblePickUp: { name, lastname, phone },
				status: 'Pendiente',
				// costShipping: shippingCost || 0
			},
			typePreOrder: 2
		};
		return this.post(this.API_ORDER_MIDDLEWARE, data, {
			headers: { Authorization: `Bearer ${this.COMPANY_TOKEN}` }
		});
	};

	processOrder = async (
		cart: CartProductItem[],
		formData: FormDataType,
	) => {

		const products = [...cart].map(
			({ product, quantity }: CartProductItem) => {
				delete product.stock;

				return { ...product, quantity };
			}
		);

		const {
			address,
			additionalInformation,
			codeTypeDelivery,
			name,
			lastname,
			phone,
			paymentType: codeTypePayment
		} = formData;

		const data = {
			isNotLogged: true,
			order: {
				additionalInformation: { address, additionalInformation },
				codeTypeDelivery,
				codeTypePayment,
				customer: {},
				makiId: null,
				orderCode: 0,
				origin: 'web',
				products,
				responsiblePickUp: { name, lastname, phone },
				status: 'Pendiente'
			},
			typePreOrder: 2
		};

		return this.post(this.API_PRE_ORDER, data, {
			headers: { Authorization: `Bearer ${this.COMPANY_TOKEN}` }
		});
	};
}

export default PreOrderService;
