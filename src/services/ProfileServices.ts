import getConfig from 'next/config';

import BaseHttpService from 'services/BaseHttpService';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

class ProfileServices extends BaseHttpService {
	readonly API = '/mis-datos';
	readonly COMPANY_TOKEN = applicationConfig.companyToken;

	constructor() {
		super(applicationConfig.salesService);
	}

	getProfilePage = (userToken: string) => {
		return this.get(this.API, {
			responseType: 'text',
			headers: { Authorization: `Bearer ${userToken}` }
		});
	};
}

export default ProfileServices;
