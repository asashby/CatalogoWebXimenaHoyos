/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
import theme from 'theme/theme';

import { getColor } from 'styles/utils';

const _default = css`
	background: ${getColor('white')({ theme })};
	border: 1px solid ${getColor('light_gray')({ theme })};
	height: 100%;
`;

const primary = css`
	background: ${getColor('green')({ theme })};
	color: ${getColor('white')({ theme })};
`;

const secondary = css`
	background: ${getColor('white')({ theme })};
	border: 1px solid ${getColor('green')({ theme })};
	color: ${getColor('green')({ theme })};
`;

const danger = css`
	background: ${getColor('white')({ theme })};
	border: 1px solid ${getColor('red')({ theme })};
	color: ${getColor('red')({ theme })};
`;

const Variants = { default: _default, primary, secondary, danger };

type ButtonProps = {
	variant?: 'primary' | 'secondary' | 'danger' | 'default';
	disabled?: boolean;
};

export const Button = styled('button')<ButtonProps>`
	border-radius: 5px;
	font-family: Poppins-SemiBold;
	font-size: 14px;
	font-weight: 600;
	padding: 9px 0;
	transition: all 0.25s linear;
	width: 100%;

	${({ variant }) => Variants[variant]}

	${({ disabled }) =>
		disabled &&
		css`
			background: #b9b9b9;
			opacity: 0.6;
			cursor: not-allowed;
		`}
`;

Button.defaultProps = {
	variant: 'default'
};
