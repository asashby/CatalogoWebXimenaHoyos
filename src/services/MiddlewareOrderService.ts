import getConfig from 'next/config';

import BaseHttpService from 'services/BaseHttpService';

import { CartProductItem } from 'models/CartProductItem';
import { User } from 'models/User';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

class MiddlewareOrderService extends BaseHttpService {
	readonly API = '/shoppyrunn/ordercreate';
	readonly COMPANY_TOKEN = applicationConfig.companyToken;

	constructor() {
		super(applicationConfig.salesMiddlewareService);
	}

	processOrder = async (cart: CartProductItem[], user?: User) => {
		const products = [...cart].map(
			({ product, quantity }: CartProductItem) => {
				const amount = Number((Number(product.price) * quantity).toFixed(2));

				return {
					id: product.id,
					name: product.name,
					price: product.price,
					amount,
					unitId: product.unitId,
					quantity,
					urlImage: product.urlImage,
					description: product.description,
					warehouseId: product.warehouseId,
					codeCommerce: product.codeCommerce,
					nameCommerce: product.nameCommerce,
					commerceId: product.commerceId,
					priceListId: product.priceListId,
					hashCommerce: product.hashCommerce
				};
			}
		);

		const data = {
			customer: {},
			customerAddressId: 0,
			flagPickUp: 2,
			hashCommerce: this.COMPANY_TOKEN,
			makiId: null,
			orderCode: 0,
			origin: 'web',
			products,
			status: 'Pendiente'
		};

		const url = `${this.API}?token=${this.COMPANY_TOKEN}`;

		return this.post(url, data);
	};
}

export default MiddlewareOrderService;
