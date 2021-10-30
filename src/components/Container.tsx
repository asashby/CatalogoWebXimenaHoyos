import styled from '@emotion/styled';
import { ReactElement } from 'react';

type Props = {
	children: ReactElement;
};

const Container = ({ children }: Props) => (
	<ContainerStyled>{children}</ContainerStyled>
);

const ContainerStyled = styled('div')`
	height: 100%;
	width: 100%;
`;

export default Container;
