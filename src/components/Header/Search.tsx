import Link from 'next/link';
import { ReactElement, useContext, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { CartContext } from 'contexts/CartContext';
import { getColor, mq } from 'styles/utils';
import { useViewport } from 'hooks/useViewport';
import { Cart } from 'components/Cart';
import CartIcon from 'components/icons/CartIcon';
import { useTheme } from 'emotion-theming';
import { Theme } from 'models/Theme';
import { useRouter } from 'next/router';

type Props = {
	commerceLogo: string;
};

const Search = ({ commerceLogo }: Props): ReactElement => {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState<string>('');
	const { width } = useViewport();
	const theme: Theme = useTheme();
	const cartContainerRef = useRef(null);
	const { cart } = useContext(CartContext);
	const [showCart, setShowCart] = useState(false);
	const isXL = width >= +theme.breakpoints['xl'].replace('px', '');

	const handleCartIconClick = () => {
		setShowCart((current) => !current);
	};

	const handleClickOutside = (e) => {
		if (
			cartContainerRef.current &&
			!cartContainerRef.current.contains(e.target)
		) {
			setShowCart(false);
		}
	};

	const handleSearch = ({ keyCode }): void => {
		if (keyCode === 13 && searchValue.length) {
			const trimedVal = searchValue.trim();
			const { commerceSlug } = router.query;
			router.replace(
				`/buscador?q=${trimedVal}&commerceSlug=${commerceSlug}`
			);
			setSearchValue('');
		}
	};

	const handleChange = (evt): void => {
		setSearchValue(evt.target.value);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<SearchStyled className="flex center">
			<picture className="logo">
				<Link href="/">
					<img
						className="pointer logo"
						src={commerceLogo}
						alt="imagen no cargada :s"
					/>
				</Link>
			</picture>
			<div className="flex row search-container">
				<div className="flex row search">
					<input
						aria-label="Buscar Productos"
						value={searchValue}
						onChange={handleChange}
						placeholder="Buscar productos"
						onKeyUp={handleSearch}
					/>
					<span className="icon-search"></span>
				</div>
				<>
					{isXL ? (
						<CartIcon quantity={cart.length} isWhite />
					) : (
						<div className="cart-container" ref={cartContainerRef}>
							<CartIcon
								className="pointer"
								quantity={cart.length}
								isWhite
								handleClick={handleCartIconClick}
							/>
							{showCart ? (
								<div className="cart">
									<Cart />
								</div>
							) : null}
						</div>
					)}
				</>
			</div>
		</SearchStyled>
	);
};

const SearchStyled = styled('div')`
	background: ${getColor('red')};
	box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.09);
	height: 40px;
	padding: 0;
	width: 100%;
	margin: auto;
	max-width: 1520px;

	.logo {
		width: auto;
		height: 32px;
	}

	.search-container {
		display: none;

		.select-container {
			height: 100%;
			width: 197px;
		}

		.search {
			margin-right: 17px;
			max-width: 542px;
			position: relative;
			width: calc(100% - 197px);
		}

		input {
			background-color: ${getColor('white')};
			border-radius: 5px 5px;
			border: solid 1px ${getColor('white')};
			color: ${getColor('black')};
			flex: 1;
			font-size: 14px;
			height: 40px;
			padding-left: 12px;
			width: 100%;
		}

		.icon-search {
			color: rgba(118, 118, 118, 0.3);
			font-size: 15px;
			position: absolute;
			right: 26px;
			top: calc(50% - 7.5px);
		}

		.cart-container {
			position: relative;

			.cart {
				position: absolute;
				top: 35px;
				right: -10px;
				z-index: 1000;
				transition: 0.25 all linear;
			}
		}
	}

	${mq.md} {
		height: 75px;

		.logo {
			height: 40px;
		}
	}

	${mq.lg} {
		justify-content: space-between;
		padding: 0 45px;

		.search-container {
			align-items: center;
			display: flex;
			height: 40px;
			justify-content: flex-end;
			padding-right: 16px;
			width: calc(100% - 245px);
		}
	}

	${mq.xl} {
		padding: 0 60px;
	}
`;

export default Search;
