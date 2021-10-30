import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;
const { googleMapKey, authService, companyToken } = applicationConfig;

class GooglePlaceApi {
	readonly urlBase = `${authService}place-locate`;
	readonly COMPANY_TOKEN = companyToken;

	getPlaces = async (place): Promise<any> => {
		const response = await axios({
			url: this.urlBase,
			method: 'post',
			headers: {
				Authorization: `Bearer ${this.COMPANY_TOKEN}`
			},
			data: {
				key: googleMapKey,
				input: place
			}
		});

		return response.data;
	};
}

export default GooglePlaceApi;
