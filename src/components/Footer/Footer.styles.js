/** @jsx jsx */
import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

export const FooterStyled = styled.footer`
	background: ${getColor('white')};
	border-top: 26px solid ${getColor('red')};
	margin-top: 40px;
	padding-bottom: 65px;
	width: 100%;

	.footer-header-container {
		flex-direction: column;
		justify-content: center;
		padding: 25px 12px 25px;

		.footer-header-item {
			font-size: 13px;
			margin: 5px 18px;

			picture {
				height: 25px;
				margin-left: 10px;

				img {
					height: 100%;
					object-fit: contain;
					width: auto;
				}
			}
		}

		${mq.md} {
			flex-direction: row;
		}

		${mq.lg} {
			padding: 35px 45px 35px;
		}

		${mq.xl} {
			padding: 35px 60px 35px;
		}
	}

	hr {
		background: #dbdbdb;
		height: 1px;
		margin: auto;
		width: calc(100% - 24px);

		${mq.lg} {
			width: calc(100% - 90px);
		}

		${mq.lg} {
			max-width: 1420px;
		}
	}

	.contact-main-container {
		margin-top: 42px;

		.compralealperu-logo-container {
			display: flex;
			flex-direction: column;
			margin-bottom: 40px;
			padding: 0 40px;

			img {
				height: 40px;
				margin-left: auto;
				margin-right: auto;
				margin-bottom: 22px;
				width: 215px;
			}

			p {
				color: #8b8b8b;
				font-size: 12px;
				line-height: normal;
				margin-bottom: 21px;
				text-align: justify;
			}
		}

		.contact-container,
		.be-friends-container {
			margin-bottom: 35px;
			text-align: center;

			.contact-title {
				color: #494949;
				font-size: 16px;
				margin-bottom: 10px;
				text-transform: uppercase;
			}

			ul {
				font-size: 12px;
				margin-top: 20px;

				li {
					color: #8b8b8b;
					list-style: none;
					margin-bottom: 12px;
					margin-top: 12px;
				}

				a {
					color: #8b8b8b;
				}
			}

			.rrss-container {
				align-items: center;
				color: #494949;
				display: flex;
				font-size: 40px;
				justify-content: center;

				a {
					color: #494949;
				}

				i {
					border: 1px solid #494949;
					border-radius: 50%;
					margin-left: 6px;
					margin-right: 6px;
				}
			}
		}
	}

	${mq.md} {
		.contact-main-container {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}
	}
	${mq.lg} {
		padding-bottom: 0;

		.contact-main-container {
			grid-template-columns: repeat(3, 1fr);

			.be-friends-container {
				grid-column: span 3 / span 3;
			}
		}
	}

	${mq.xl} {
		.contact-main-container {
			grid-template-columns: repeat(4, 1fr);

			.contact-container {
				padding-left: 80px;
				text-align: left;
			}

			.be-friends-container {
				grid-column: auto;
			}
		}
	}
`;

export const MobileFooterStyled = styled('footer')`
	bottom: -1px;
	height: 58px;
	background: ${getColor('white')};
	border-top: solid 2.5px ${getColor('red')};
	padding: 9px;
	position: fixed;
	width: 100%;
	z-index: 1000;

	${mq.md} {
		padding: 18px;
	}

	${mq.lg} {
		display: none;
	}
`;

export const MobileFooterMenu = styled('ul')`
	cursor: pointer;
	display: flex;
	justify-content: space-around;
	list-style: none;
	width: 100%;

	${mq.md} {
		justify-content: center;
	}
`;

export const MobileFooterMenuItem = styled('li')`
	display: flex;
	align-items: center;
	flex-direction: column;
	flex: 1;
	font-size: 11px;
	margin: 0;

	span.medium,
	i {
		color: #c8c8c8;
		margin: 0 6px;
		transition: all 0.25s linear;
	}

	[class^='icon-'] {
		font-size: 20px;
		margin-bottom: 4px;
	}

	&:hover,
	&.active {
		span.medium,
		i {
			color: ${getColor('green')};
		}
	}

	${mq.md} {
		flex-direction: row;
		flex: none;
		margin: 0 14px;

		[class^='icon-'] {
			margin-bottom: 0;
		}
	}
`;
