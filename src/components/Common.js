import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

export const MobileWrapperModal = styled('div')`
	background: ${getColor('light_gray')};
	bottom: 0;
	box-sizing: border-box;
	height: calc(100% - 57.5px);
	left: 0;
	overflow-y: auto;
	padding: 12px;
	position: fixed;
	top: 0;
	transform: translateX(-100vw);
	transition: all 0.25s ease-in-out;
	width: 100%;
	z-index: 10000;

	&.show {
		transform: translateX(0);
	}

	${mq.lg} {
		display: none;
	}

	.btn-show-more {
		height: 38px;
		margin: 25px auto;
		width: 119px;
	}
`;

export const MobileContentModal = styled('div')`
	background: ${getColor('light_gray')};
	border-radius: 12px;
	box-shadow: 0 2px 12px 0 rgba(230, 230, 230, 0.5);
	height: 100%;
	padding-top: 20px;
	padding-bottom: 25px;
	width: 100%;
	overflow-y: auto;
	position: relative;
`;

export const MobileHeaderModal = styled('div')`
	align-items: center;
	color: ${getColor('black')};
	font-size: 16px;
	align-items: center;
	padding: 0px 10px;

	i {
		color: ${getColor('green')};
	}

	button {
		&::after {
			align-items: center;
			background-color: white;
			border-radius: 50%;
			box-shadow: 0 0 transparent, 0 0 transparent, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
			content: '\u2715';
			color: ${getColor('red')};
			display: flex;
			height: 31px;
			justify-content: center;
			width: 31px;
		}
	}

	&.step-2--header {
		background-color: ${getColor('light_gray')};
		height: 58px;

		div {
			color: ${getColor('primary')};
			justify-content: center;
			width: 100%;
		}
	}
`;

export const ProductWrapper = styled('div')`
	margin-bottom: 10px;
	width: 100%;

	${mq.sm} {
		padding-right: 10px;
		width: 50%;
	}

	${mq.md} {
		padding-right: 15px;
		width: 33.33%;
	}

	${mq.lg} {
		width: 25%;
	}

	${mq.xxl} {
		width: 20%;
	}
`;

export const MaxLayoutWidth = styled('div')`
	height: 100%;
	margin: 0 auto;
	max-width: 1520px;
	padding-left: 12px;
	padding-right: 12px;
	width: 100%;

	${mq.md} {
		padding-left: 45px;
		padding-right: 45px;
	}

	${mq.md} {
		padding-left: 60px;
		padding-right: 60px;
	}
`;
