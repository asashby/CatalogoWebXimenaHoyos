import getConfig from 'next/config';

import { db } from 'config/firebase-config';
import { Product } from 'models/Product';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

class CategoryService {
	private readonly companyCode = applicationConfig.companyCode;

	getProductByCategory = async (categorySlug: string): Promise<Product[]> => {
		const URL = `${this.companyCode}/dataCategories/${categorySlug}`;
		const data = [];

		const response = await db.ref(URL).limitToFirst(100).once('value');

		const products = await response.val();

		Object.keys(products || {}).forEach((key: string) => {
			if (!key.includes(`--`) && products[key].stock) {
				data.push(products[key]);
			}
		});

		return data.sort(() => 0.5 - Math.random());
	};

	getProductBySubCategory = async (
		categorySlug: string,
		subCategorySlug: string
	) => {
		const URL = `${this.companyCode}/dataSubCategories/${categorySlug}/${subCategorySlug}`;
		const data = [];

		const response = await db.ref(URL).once('value');

		const products = await response.val();

		Object.keys(products || {}).forEach((key: string) => {
			if (!key.includes(`--`) && products[key].stock) {
				data.push(products[key]);
			}
		});

		return data.sort(() => 0.5 - Math.random());
	};
}

export default CategoryService;
