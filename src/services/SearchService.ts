import getConfig from 'next/config';

import BaseHttpService from 'services/BaseHttpService';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

class SearchService extends BaseHttpService {
	readonly API = '/products-commerce/search';
	readonly COMPANY_TOKEN = applicationConfig.companyToken;

	constructor() {
		super(applicationConfig.searchService);
	}

	searchProducts = async (searchValue: string, commerceSlug: string) => {
		const data = {
			search: searchValue,
			commerceSlug: commerceSlug
		};

		return this.post(this.API, data, {
			headers: { Authorization: `Bearer ${this.COMPANY_TOKEN}` }
		});
	};
}

export default SearchService;
