import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

const $red = '#ff133b';

export const LoginModalStyled = styled('div')`
	align-items: center;
	animation: fadeIn ease-in 0.25s;
	background-color: rgba(0, 0, 0, 0.23);
	height: 100vh;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 1020;
`;

export const LoginModalContent = styled('div')`
	background: ${getColor('white')};
	border-radius: 8px;
	box-shadow: 2px 0 15px 0 rgba(0, 0, 0, 0.18);
	height: auto;
	justify-content: space-between;
	margin-top: -10px;
	max-height: 92%;
	max-width: 544px;
	min-height: 280px;
	overflow-y: auto;
	padding: 26px 25px;
	position: relative;
	width: 92%;
`;

export const LoginModalHeader = styled('div')`
	align-items: center;
	background: #f7f7f7;
	min-height: 40px;
	justify-content: space-between;
	margin-bottom: 20px;
	padding-left: 20px;
	padding-right: 13px;
`;

export const LoginModalTitle = styled('h3')`
	color: ${$red};
	font-size: 15px;

	${mq.md} {
		font-size: 17px;
	}
`;

export const LoginModalClose = styled('button')`
	border: 1px solid #fe4536;
	border-radius: 50%;
	color: #fe4536;
	font-size: 12px;
	line-height: 16px;
	height: 20px;
	text-align: center;
	width: 20px;
	transition: all 0.25s linear;

	&:hover {
		background: #fe4536;
		color: white;
	}

	&:disabled {
		opacity: 0.65;
	}
`;

export const LoginModalBody = styled('div')``;

export const LoginModalFooter = styled('div')`
	min-height: 40px;
	margin-top: 40px;

	button {
		background: #f7f7f7;
		color: #ff133b;
		font-size: 13;
		text-align: center;
		text-decoration: underline;
	}
`;

export const SignInStyled = styled('div')``;

export const SignUpStyled = styled('div')``;

export const MessageError = styled('p')`
	color: #ff133b;
	font-size: 14px;
	margin-bottom: 8px;
	text-align: center;
	height: 18px;
`;

export const Notification = styled('div')`
	color: ${getColor('black')};
	align-items: center;
	font-size: 18px;
	line-height: 24px;
	text-align: center;
	padding: 16px;
	height: 100%;
	justify-content: space-around;

	button {
		width: 180px;
	}
`;
