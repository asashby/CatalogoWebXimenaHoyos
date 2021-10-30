import Head from 'next/head';
import { ReactElement } from 'react';

import { capitalize } from 'utils/utils';
import { Commerce } from 'models/Commerce';
import CommerceContainer from 'containers/CommerceContainer';
import CommerceService from 'services/CommerceService';
import Error from '../_error';

type Props = {
	commerce: Commerce;
	url: string;
	statusCode: number;
};

const CommercePage = (props: Props): ReactElement => {
	const { commerce, statusCode } = props;

	if (statusCode === 404) {
		return (
			<Error
				statusCode={statusCode}
				title="Tienda no encontrada"
				message="Lo sentimos, no encontramos la tienda que solicitaste"
			/>
		);
	}

	const { data } = commerce;
	const { name, metas = [] } = data;
	const _metas = metas.filter((meta) => !!meta);

	return (
		<>
			<Head>
				<title>{capitalize(name)}</title>
				{_metas.map((meta) => (
					<meta {...meta} key={meta.property || meta.name} />
				))}
			</Head>
			<CommerceContainer {...props} />
		</>
	);
};

export const getServerSideProps = async ({ params }) => {
	const commerceService = new CommerceService();
	const { commerceSlug } = params;

	try {
		const { commerce, url } = await commerceService.getCommerce(
			commerceSlug
		);

		if (!commerce) {
			return {
				props: {
					statusCode: 404
				}
			};
		}
		return {
			props: {
				commerce,
				url,
				commerceName: commerce.data?.name,
				commerceLogo: commerce.data?.urlImage,
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

export default CommercePage;
