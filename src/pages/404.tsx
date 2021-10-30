import Head from 'next/head';

import NotFoundContainer from 'container/ErrorContainer';

const title = 'Página no encontrada';
const description = 'Lo sentimos, no encontramos la URL que solicitaste.';

const NotFound = () => (
	<>
		<Head>
			<title>{title}</title>
		</Head>
		<NotFoundContainer
			title={title}
			message={description}
			statusCode={404}
		/>
	</>
);

export default NotFound;
