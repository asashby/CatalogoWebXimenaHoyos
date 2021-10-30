const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

module.exports = {
	async redirects() {
		return [
			{
				destination: `/tienda/${process.env.COMMERCENAME}`,
				permanent: true,
				source: '/',
			}
		];
	},
	compress: true,
	target: 'serverless',
	publicRuntimeConfig: {
		firebaseConfig: {
			apiKey: process.env.API_KEY,
			appId: process.env.APP_ID,
			authDomain: process.env.AUTH_DOMAIN,
			databaseURL: process.env.DB_URL,
			measurementId: process.env.MEASUREMENT_ID,
			messagingSenderId: process.env.MESSAGING_SENDER_ID,
			projectId: process.env.PROJECT_ID,
			storageBucket: process.env.STORAGE_BUTCKET
		},
		applicationConfig: {
			authService: process.env.HTTP_AUTH,
			codeApp: process.env.CODE_APP,
			codeProject: process.env.CODE_PROJECT,
			codeRole: process.env.CODE_ROLE,
			commerceName: process.env.COMMERCENAME,
			companyCode: process.env.COMPANY_CODE,
			companyToken: process.env.COMPANY_TOKEN,
			companyWhatsappNumber: process.env.WHATSAPPNUMBER,
			countryTax: process.env.TAX_BY_COUNTRY,
			currency: process.env.CURRENCY,
			googleMapKey: process.env.GOOGLE_MAP_KEY,
			googleSearchPlace: process.env.GOOGLE_SEARCH_PLACE,
			salesMiddlewareService: process.env.HTTP_MIDDLEWARE_SALES,
			salesService: process.env.HTTP_SALES,
			searchService: process.env.HTTP_SEARCH,
			shippingCostEndPoint: process.env.HTTP_AUTH,
			showFavorites: process.env.SHOW_FAVORITES,
			showRealTimeInfo: process.env.SHOW_REAL_TIME_INFO,
		}
	},
	typescript: {
		ignoreBuildErrors: false
	}
};
