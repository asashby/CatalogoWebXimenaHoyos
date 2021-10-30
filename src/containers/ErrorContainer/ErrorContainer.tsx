import Link from 'next/link';
import { Button } from 'components/Button';
import getConfig from 'next/config';

import {
	ErrorContainerStyled,
	ErrorContainerTitle,
	ErrorContainerMessage,
	Separator,
	ErrorContainerDescription
} from './ErrorContainer.styles';

type Props = {
	message?: string;
	statusCode: number;
	title?: string;
};

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

export const ErrorContainer = ({
	message = '',
	statusCode,
	title = ''
}: Props) => (
	<ErrorContainerStyled className="flex column">
		<ErrorContainerTitle className="bold">{statusCode}</ErrorContainerTitle>
		<ErrorContainerMessage className="bold upper">
			{title}
		</ErrorContainerMessage>
		<Separator />
		<ErrorContainerDescription className="medium">
			{message}
		</ErrorContainerDescription>
		<Link href={`/tienda/${applicationConfig.commerceName}`}>
			<Button variant="primary" className="upper button">
				Volver a la tienda
			</Button>
		</Link>
	</ErrorContainerStyled>
);
