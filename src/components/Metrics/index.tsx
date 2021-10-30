import { useState } from 'react';
import styled from '@emotion/styled';

import { getColor } from 'styles/utils';

const Metrics = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleClick = () => {
		setIsOpen((current) => !current);
	};

	return (
		<MetricsStyled
			className={`pointer ${isOpen ? 'open' : ''}`}
			onClick={handleClick}
		>
			{isOpen ? null : (
				<span className="title semi-bold">Datos en tiempo real</span>
			)}
			<span className="icon-left"></span>
			{isOpen ? (
				<div className="info flex column fade-in">
					<div className="info-item center medium">
						<span className="icon-cart"></span>
						<span className="value bold">
							{(10000).toLocaleString()}
						</span>
						<span className="text">Ventas en tiempo real</span>
					</div>
					<div className="separator"></div>
					<div className="info-item center medium">
						<span className="icon-sold"></span>
						<span className="value bold">
							{(8000).toLocaleString()}
						</span>
						<span className="text">Pedidos entregados</span>
					</div>
				</div>
			) : null}
		</MetricsStyled>
	);
};

const MetricsStyled = styled('div')`
	background: ${getColor('white')};
	box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.25);
	border-radius: 8px;
	display: inline-block;
	height: 196px;
	position: relative;
	width: 0px;
	border-left: 43px solid ${getColor('green')};
	border-color: ${getColor('green')};
	transition: all 0.25s linear;

	.title {
		bottom: -5px;
		color: ${getColor('white')};
		font-size: 14px;
		left: -30px;
		letter-spacing: -0.43px;
		position: absolute;
		text-align: center;
		transform-origin: 0 0;
		transform: rotate(270deg);
		width: 196px;
	}

	.icon-left {
		bottom: 13px;
		color: ${getColor('white')};
		height: 22px;
		left: -27px;
		padding: 5px 0;
		position: absolute;
	}

	.info {
		height: 100%;
		justify-content: space-between;
		align-items: center;

		.info-item {
			flex-direction: column;
			justify-content: space-around;
			height: 100%;
		}

		[class^='icon-'] {
			color: #000;
			font-size: 22px;
		}

		.text {
			color: #000;
			font-size: 13px;
		}

		.value {
			color: ${getColor('red')};
			font-size: 22px;
		}

		.separator {
			border: solid 1px #ececec;
			height: 2px;
			object-fit: contain;
			width: 168px;
		}
	}

	&.open {
		border-left-width: 27px;
		width: 215px;

		.icon-left {
			left: -18px;
			top: calc(50% - 11px);
			transform: rotate(-180deg);
		}
	}
`;

export default Metrics;
