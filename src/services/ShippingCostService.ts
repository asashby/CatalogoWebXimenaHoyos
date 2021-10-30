import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;
const { shippingCostEndPoint } = applicationConfig;

class ShippingCostService {
	readonly urlBase = `${shippingCostEndPoint}get-shipping-cost?destinations=`;

	get = async ({ lat, lng }, PRODUCT_TOKEN): Promise<any> => {
		const url = `${this.urlBase}${lat},${lng}`

		try {
			const response = await axios({
				url,
				method: 'get',
				headers: {
					Authorization: `Bearer ${PRODUCT_TOKEN}`
				},
			});

			return {
				statusCode: 200,
				costShipping: response.data.costShipping,
				message: response.data.message,
			};
		} catch (error) {
			return {
				statusCode: 400,
				errorMessage: error.response.data.message,
			};
		}
	};
}

export default ShippingCostService;
