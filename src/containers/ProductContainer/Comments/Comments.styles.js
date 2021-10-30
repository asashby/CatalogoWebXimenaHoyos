/** @jsx jsx */
import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

export const CommentStyled = styled('div')`
	padding: 35px 0;
	margin-left: 30px;
	border-bottom: solid 0.5px rgba(118, 118, 118, 0.3);
`;

export const CommentInfo = styled('div')`
	align-items: center;
`;

export const CommentRating = styled('div')``;

export const CommentDate = styled('span')`
	color: #787878;
	font-size: 14px;
	margin: 0 27px;
`;

export const CommentUser = styled('span')`
	color: ${getColor('black')};
	font-size: 18px;
	margin-right: 8px;
	padding: 0 8px;
`;

export const CommentMessage = styled('p')`
	color: #787878;
	font-size: 14px;
	margin-top: 16px;
	padding: 0 18px;
`;

export const CommentsStyled = styled('div')`
	background: ${getColor('white')};
	padding: 14px 14px 24px;
	margin-top: 10px;

	${mq.md} {
		padding: 13px 21px 30px 18px;
	}
`;

export const CommentsHeader = styled('div')`
	align-items: center;
	background: #f7f7f7;
	justify-content: space-between;
	padding: 8px 8px 8px 15px;
	width: 100%;

	h3 {
		color: #10111e;
		font-size: 13.5px;
		line-height: 0.96;

		${mq.md} {
			font-size: 15px;
			line-height: 0.87;
		}
	}

	button {
		background: ${getColor('green')};
		border-radius: 4px;
		color: ${getColor('white')};
		font-size: 12px;
		height: 37px;
		padding: 0 10px;

		${mq.md} {
			font-size: 14px;
		}
	}

	${mq.md} {
		padding: 9px 14px 7px 33px;
	}
`;

export const CommentsList = styled('div')``;

export const CreateCommentModalStyled = styled('div')`
	position: fixed;
	background-color: rgba(0, 0, 0, 0.23);
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 1020;
	animation: fadeIn ease-in 0.25s;
`;

export const ModalWrapper = styled('div')`
	background: ${getColor('white')};
	border-radius: 15px;
	box-shadow: 2px 0 15px 0 rgba(0, 0, 0, 0.18);
	height: auto;
	max-height: 540px;
	justify-content: space-between;
	max-width: 622px;
	padding: 22px 18px;
	position: relative;
	width: 90%;

	.btn-publish {
		max-width: 215px;
		height: 49px;
	}
`;

export const ModalClose = styled('span')`
	color: ${getColor('red')};
	position: absolute;
	right: 29px;
	top: 29px;
`;

export const ModalTitle = styled('h3')`
	color: ${getColor('black')};
	font-size: 14px;
	margin-top: 8px;
	text-align: left;
`;

export const ModalInput = styled('textarea')`
	background-color: #f9f9f9;
	border-radius: 5px;
	border: solid 1px rgba(118, 118, 118, 0.18);
	font-size: 14px;
	height: 230px;
	outline: none;
	padding: 10px 15px;
	margin-bottom: 12px;
`;

export const ModalRating = styled('div')`
	align-items: flex-start;
	flex-direction: column;
	margin: 10px 0;

	.label {
		color: #494949;
		font-size: 12px;
		margin-right: 15px;
		margin-bottom: 8px;
	}

	.warning {
		color: ${getColor('red')};
		font-size: 10px;
		margin-top: 8px;
	}

	${mq.md} {
		align-items: center;
		flex-direction: row;

		.label {
			font-size: 14px;
			margin-bottom: 0;
		}

		.warning {
			font-size: 11px;
			margin-top: 0;
			margin-left: 10px;
		}
	}
`;

export const NoComments = styled('p')`
	color: ${getColor('dark_gray')};
	font-size: 14px;
	margin: 20px 0 10px;
	text-align: center;

	${mq.md} {
		font-size: 16px;
	}
`;
