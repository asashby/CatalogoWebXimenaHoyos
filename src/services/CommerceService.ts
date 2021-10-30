import getConfig from 'next/config';
import { db } from 'config/firebase-config';

import { Commerce } from 'models/Commerce';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

class CommerceService {
	readonly companyCode = applicationConfig.companyCode;

	getCommerce = async (commerceSlug: string) => {
		const URL = `${this.companyCode}/commerces/${commerceSlug}`;
		const response = await db.ref(URL).once('value');
		const commerce: Commerce = await response.val();
		return { commerce, url: URL };
	};

	getCommerces = async () => {
		const URL = `${this.companyCode}/commerces`;
		const response = await db.ref(URL).once('value');
		const value = await response.val();

		const commerces = Object.keys(value).map((slug: string) => {
			const { data = {} } = value[slug];
			const { name, urlImage: logo = '', id, code } = data;

			return { name, slug, logo, id, code };
		});

		return commerces;
	};
}

export default CommerceService;
