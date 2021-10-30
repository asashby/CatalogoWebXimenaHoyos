import { jsx } from '@emotion/core';
import styled, { CreateStyled } from '@emotion/styled';

export const breakpoints: any = [
	'480px',
	'768px',
	'1024px',
	'1280px',
	'1500px'
];

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
breakpoints.xxl = breakpoints[4];

export default {
	colors: {
		black: '#1F1F1F',
		light_gray: '#F8F8F8',
		dark_gray: '#767676',
		gray: '#b9b9b9',
		green: '#2ABCA4',
		primary: '#004ea8',
		red: '#F40029',
		secondary: '',
		whatsapp: '#28a745',
		white: '#FFF'
	},
	breakpoints
};
