import Head from 'next/head';
import ErrorContainer from 'container/ErrorContainer';

type Props = {
	message?: string;
	statusCode: number;
	title?: string;
};

const Error = (props: Props) => {
	return (
		<>
			<Head>
				<title>{props.title}</title>
			</Head>
			<ErrorContainer {...props} />
		</>
	);
};

Error.getInitialProps = ({ res, err }) => {
	let statusCode;

	if (res) {
		statusCode = res.statusCode;
	} else if (err) {
		statusCode = err.statusCode;
	} else {
		statusCode = null;
	}

	return { statusCode };
};

export default Error;
