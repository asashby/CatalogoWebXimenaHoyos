import BaseHttpService from 'services/BaseHttpService';

class RelatedProductsService extends BaseHttpService {
	readonly API = 'products-public';

	constructor() {
		super('https://products2.makipos.la/');
	}

	getRelatedProducts = async (productId: number | string, hash: string) => {
		const URL = `${this.API}/${productId}/related`;

		return this.get(URL, {
			headers: { Authorization: `Bearer ${hash}` }
		});
	};
}

export default RelatedProductsService;
