import styled from '@emotion/styled';
import { getColor } from 'styles/utils';

export const HeaderWrapper = styled('header')`
	background: ${getColor('white')};
	box-shadow: 0 0 10px 1px ${getColor('black', 0.2)};
	top: 0;
	width: 100%;
	z-index: 1010;
`;

export const HeaderStyled = styled('div')`
	background: ${getColor('red')};
`;
