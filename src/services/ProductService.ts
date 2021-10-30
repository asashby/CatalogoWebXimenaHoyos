import getConfig from 'next/config';

import { db } from 'config/firebase-config';

import { Product } from 'models/Product';
import { ProductsByCategory } from 'models/ProductsByCategory';
import { ParsedUrlQuery } from 'querystring';
import { FavotireProduct } from 'models/FavotireProduct';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

class ProductService {
	readonly companyCode = applicationConfig.companyCode;

	getFavoritesProducts = async (): Promise<FavotireProduct[]> => {
		const URL = `${this.companyCode}/data/favorites`;

		const response = await db.ref(URL).once('value');
		const products: FavotireProduct[] = await response.val();

		return products;
	};

	getHomeProducts = (): Promise<ProductsByCategory[]> => {
		const URL = `${this.companyCode}/dataCategories`;

		return db
			.ref(URL)
			.once('value')
			.then((snapshot) => {
				const reads = [];

				snapshot.forEach((childSnapshot) => {
					const key = childSnapshot.key;

					const promise = childSnapshot.ref
						.limitToFirst(12)
						.once('value')
						.then((reponse) => {
							return {
								name: key,
								products: reponse.val()
							};
						});

					reads.push(promise);
				});
				return Promise.all(reads);
			})
			.then((values) => values);
	};

	getVariationsProducts = async (
		query: ParsedUrlQuery
	): Promise<Product[]> => {
		const { commerceSlug, productSlug } = query;
		const URL = `${this.companyCode}/commerces/${commerceSlug}/products`;
		const response = await db
			.ref(URL)
			.orderByKey()
			.startAt(`${productSlug}--`)
			.limitToFirst(10)
			.once('value');
		const products: Product[] = await response.val();
		const data = [];

		Object.keys(products || {}).forEach((key: string) => {
			if (key.includes(`${productSlug}--`) && products[key].stock) {
				data.push(products[key]);
			}
		});

		return data;
	};
}

export default ProductService;
