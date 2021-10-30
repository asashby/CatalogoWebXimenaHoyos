import getConfig from 'next/config';
import Head from 'next/head';

import { db } from 'config/firebase-config';
import 'firebase/database';

import Error from '../../_error';
import { capitalize } from 'utils/utils';
import { Commerce, CommerceData } from 'models/Commerce';
import { Product } from 'models/Product';
import ProductContainer from 'containers/ProductContainer';

type Props = {
	commerceData: CommerceData;
	product: Product;
	statusCode: number;
};

const ProductPage = (props: Props) => {
	const { commerceData, statusCode, product } = props;

	if (statusCode === 404) {
		return (
			<Error
				statusCode={statusCode}
				title="Producto no encontrado"
				message="Lo sentimos, no encontramos el producto que solicitaste"
			/>
		);
	}

	const { name: commerceName } = commerceData;
	const { name: productName, description } = product;

	return (
		<>
			<Head>
				<title>{capitalize(`${commerceName}: ${productName}`)}</title>
				<meta name="description" content={description} />
			</Head>
			<ProductContainer {...props} />
		</>
	);
};

const { publicRuntimeConfig } = getConfig();

export const getServerSideProps = async ({ params }) => {
	const { applicationConfig } = publicRuntimeConfig;
	const { commerceSlug, productSlug } = params;
	const URL = `${applicationConfig.companyCode}/commerces/${commerceSlug}`;

	try {
		const response = await db.ref(URL).once('value');
		const commerce: Commerce = await response.val();

		const { products, data } = commerce;

		if (!products[productSlug]) {
			return {
				props: {
					statusCode: 404
				}
			};
		}

		return {
			props: {
				commerceData: data,
				commerceLogo: data.urlImage,
				commerceName: data.name,
				product: products[productSlug],
				statusCode: 200
			}
		};
	} catch (err) {
		console.log('Error:', err);

		return {
			props: {
				statusCode: 404
			}
		};
	}
};

export default ProductPage;
