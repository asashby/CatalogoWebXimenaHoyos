import styled from '@emotion/styled';

import { getColor, mq } from 'styles/utils';

export const CartStyled = styled('div')`
	background: ${getColor('white')};
	border-radius: 12px;
	box-shadow: 0 2px 12px 0 rgba(230, 230, 230, 0.5);
	padding: 24px 7px 19px 6px;
	width: 229px;

	.commerce-name {
		background: ${getColor('black')};
		border-radius: 4px;
		color: ${getColor('white')};
		font-size: 12px;
		height: auto;
		padding: 3px 8px;
		text-align: center;
		width: 100%;
	}

	.cart-submit {
		align-self: flex-end;
		border-radius: 4px;
		color: ${getColor('white')};
		display: flex;
		height: 49px;
		width: 100%;
	}
`;

export const CartHeader = styled('div')`
	padding: 5px 25px 15px 13px;
	justify-content: space-between;

	h3 {
		color: ${getColor('red')};
		font-size: 15px;
		text-transform: uppercase;
	}

	${mq.lg} {
		h3 {
			font-size: 18px;
		}
	}
`;

export const CartDetailContainer = styled('div')`
	background: ${getColor('white')};
	border-radius: 5px;
	box-shadow: 2px 0 12px 0 rgba(230, 230, 230, 0.5);
	padding: 15px 14px 23px 14px;
	margin-bottom: 12px;
`;

export const DeliveryTypeStyle = styled('div')`
	display: flex;
	justify-content: center;

	button {
		font-size: 12px;
		padding: 1rem;

		&.selected {
			color: ${getColor('primary')};
		}
	}
`

export const CartPaymentDetail = styled('div')`
	justify-content: center;
	align-items: stretch;
	margin: 20px 0 15px;

	.item {
		padding: 0 5px;
		font-size: 12px;
		line-height: 1.25;
		color: #000;
		text-align: center;
	}

	.separator {
		width: 2px;
		background: #c6c6c6;
		margin: 0 10px;
	}
`;

export const Separator = styled('hr')`
	height: 2px;
	background: #eeeeee;
	margin: 0 -14px 0 -24px;

	${mq.lg} {
		margin: 0;
	}
`;

export const CartDetailTotal = styled('span')`
	background: #e9e9e9;
	border-radius: 4px;
	color: ${getColor('red')};
	font-size: 16px;
	font-weight: 600;
	height: 35px;
	margin-top: 5px;

	${mq.lg} {
		margin: 5px 12px;
	}
`;

export const CartMobileStyled = styled('div')`
	margin: 21px auto 65px;
	max-width: 483px;

	.cart-submit {
		border-radius: 4px;
		height: 49px;
		margin-bottom: 22px;
	}
`;

export const CartItemList = styled('div')`
	align-items: center;
	margin-bottom: 20px;
	min-height: 100px;
	overflow-y: auto;
	scroll-behavior: smooth;

	${mq.lg} {
		max-height: 230px;
	}

	.commerce-name {
		background-color: ${getColor('red')};
		border-radius: 5px;
		color: ${getColor('white')};
		font-size: 14px;
		margin-top: 20px;
		padding: 5px;
		text-align: center;
	}
`;

export const EmptyCart = styled('div')`
	height: 75px;
	justify-content: flex-end;

	.icon-cart {
		color: #b5b5b5;
		font-size: 32px;
	}

	.text {
		color: #b5b5b5;
		font-size: 16px;
		margin-top: 8px;
	}

	${mq.lg} {
		.icon-cart {
			font-size: 24px;
		}

		.text {
			font-size: 12px;
			margin-top: 5px;
		}
	}
`;

export const CartItemStyled = styled('article')`
	height: 76px;
	margin: 6px 0;
	padding: 8px 0;
	justify-content: space-between;
	align-items: center;

	picture {
		height: 55px;
		overflow: hidden;
		width: 60px;

		img {
			max-height: 100%;
			max-width: 100%;
			object-fit: cover;
		}
	}

	.product-name {
		font-size: 12px;
		color: ${getColor('black')};
		line-height: 1.5;
		margin: 0 3px 0 6px;
		padding: 2px;
		flex: 1;
	}

	.remove-item,
	.product-quantity {
		border-radius: 50%;
		border: 1px solid ${getColor('green')};
		color: ${getColor('green')};
		font-size: 14px;
		height: 22px;
		line-height: 22px;
		text-align: center;
		width: 22px;
	}

	.remove-item {
		border: 1px solid ${getColor('red')};
		color: ${getColor('red')};
		font-size: 12px;
		line-height: 1.5;
	}
`;

export const CartItemMobileStyled = styled('article')`
	background: ${getColor('white')};
	border-radius: 5px;
	box-shadow: 2px 0 12px 0 rgba(230, 230, 230, 0.5);
	margin-bottom: 10px;
	padding: 24px 9px 16px 15px;
	width: 100%;
	align-items: center;

	> div {
		width: 100%;
	}

	picture {
		border-radius: 12px;
		height: 92px;
		width: 104px;
		overflow: hidden;
		margin-right: 16px;

		img {
			object-fit: cover;
			height: 100%;
			width: 100%;
		}
	}

	hr {
		height: 1px;
		background: #eeeeee;
		margin: 30px 0 14px;
		width: 100%;
	}

	.info {
		width: calc(100% - 120px);
	}

	.price {
		align-items: center;
		justify-content: space-between;
		margin-top: 15px;

		.amount {
			color: #10111e;
			font-size: 20px;
			text-align: center;
			flex: 1;
		}
	}

	.product-name {
		color: ${getColor('black')};
		font-size: 17px;
		line-height: 1.25;
		margin: 7px 0 14px;
	}

	.commerce-name {
		color: ${getColor('white')};
		background: ${getColor('red')};
		border-radius: 5px;
		font-size: 13px;
		padding: 4px 8px;
		width: 90%;
		text-align: center;
	}

	.remove-item {
		justify-self: center;
		color: ${getColor('red')};
		font-size: 11px;
		line-height: 22px;
		margin-right: -25px;
		position: relative;

		&:before {
			content: 'x';
			position: absolute;
			left: -30px;
			border-radius: 50%;
			border: 1px solid ${getColor('red')};
			color: ${getColor('red')};
			font-size: 14px;
			height: 21px;
			line-height: 18px;
			text-align: center;
			width: 21px;
		}
	}
`;

export const CartProductItemActionsStyled = styled('div')`
	width: auto;

	input {
		background: ${getColor('light_gray')};
		border-radius: 2px;
		color: #494949;
		height: 45px;
		font-size: 16px;
		line-height: 45px;
		margin-right: 7px;
		text-align: center;
		width: 69px;
	}

	button {
		background: #494949;
		border-radius: 2px;
		color: ${getColor('white')};
		font-size: 10px;
		height: 21px;
		line-height: 21px;
		transition: 0.25s background linear;
		width: 26px;

		&:disabled {
			background: #d8d8d8;
		}

		&:first-of-type {
			margin-bottom: 3px;
		}
	}
`;

export const BottomActionsStyled = styled('div')`
	background-color: ${getColor('light_gray')};
	padding-bottom: 10px;
	padding-top: 10px;
	width: 100%;

	small {
		display: flex;
		justify-content: center;
		margin: 0 auto;
	}

	&.btns-web-styles {
		position: relative;
		width: 433px;
	}

`;

export const ButtonsActionsContainerStyled = styled('div')`
	align-items: center;
	display: flex;
	justify-content: center;

	button {
		align-items: center;
		background-color: ${getColor('primary')};
		color: white;
		display: flex;
		height: 46px;
		justify-content: center;
		margin: 0.5rem;

		&.whatsapp {
			background-color: ${getColor('whatsapp')};
			padding-left: 20px;
			padding-right: 20px;
		}
		&.proccess {
			background-color: ${getColor('red')};
		}
	}
`;

export const CartMobileFormStyled = styled('div')`
	background-color: white;
	margin-top: 24px;
	padding-left: 20px;
	padding-right: 20px;
	margin-left: auto;
	margin-right: auto;
	max-width: 483px;
	width: 100%;

	.google-map-press {
		align-items: center;
		border: 1px solid ${getColor('red')};
		border-radius: 5px;
		color: ${getColor('red')};
		display: flex;
		font-size: 12px;
		justify-content: center;
		margin-top: 1rem;
		padding: 1rem 0.5rem;
		width: 100%;

		&:hover {
			background-color: ${getColor('red')};
			color: white;
		}
	}

	.shipping-cost-btn {
		align-items: center;
		border: 1px solid ${getColor('red')};
		border-radius: 5px;
		color: ${getColor('red')};
		display: flex;
		font-size: 12px;
		justify-content: center;
		margin-top: 1rem;
		padding: 1rem 0.5rem;
		width: 100%;

		&:hover {
			background-color: ${getColor('red')};
			color: white;
		}
	}
`;

export const SelectOptionStyled = styled('div')`
	margin-bottom: 16px;
	width: 100%;

	select {
		border: 1px solid #d8d8d8;
		height: 42px;
		padding-left: 20px;
		width: 100%;
	}

	.has-error {

	}
  .warehouse-address {
    background-color: ${getColor('light_gray')};
    color: ${getColor('red')};
    padding: 8px 1rem;
    font-size: 13px;

    a {
      color: ${getColor('red')};
      text-decoration: underline;
    }
  }
`;

export const TextAreaStryled = styled('div')`
	margin-bottom: 16px;

	label {
		color: #10111e;
		font-family: Poppins-Medium;
		font-size: 14px;
    font-weight: 500;
		margin-bottom: 6px;
	}

	textarea {
		border: 1px solid #d8d8d8;
		height: 80px;
		padding-left: 1rem;
		padding-top: 0.5rem;
		width: 100%;
	}
`;

export const GpsCheckStyled = styled('div')`
	align-items: center;
	display: flex;
	padding-bottom: 10px;

	div {
		margin-bottom: 0;
		margin-right: 10px;
		width: fit-content;

		input {
			padding-left: 0;
			height: 35px;
			width: 35px;
		}

		.has-error {
			display: none;
		}
	}


	label {
		color: #10111e;
		font-family: Poppins-Medium;
		font-size: 12px;
    	font-weight: 500;
		margin-bottom: 6px;
	}
`;
