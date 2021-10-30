import { ReactElement } from 'react';

import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

const Loading = (): ReactElement => (
	<LoadingStyled>
		<div className="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</LoadingStyled>
);

const LoadingStyled = styled('div')`
	display: flex;
	justify-content: center;
	padding: 25px 0;
`;

export default Loading;
