/** @jsx jsx */

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, ReactElement } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

import SelectCategories from './SelectCategories';
import { CategoriesNavigation } from 'components/CategoriesNavigation';
import { getColor, mq } from 'styles/utils';
import Breadcrumb from './Breadcrumb';
import { MaxLayoutWidth } from 'components/Common';

type CategoriesProps = {
	commerceName: string;
};

const Categories = ({ commerceName }: CategoriesProps): ReactElement => {
	const { query } = useRouter();
	const [commerceLink, setCommerceLink] = useState<string>('');
	const [top, setTop] = useState<number>(0);
	const [openMenu, setOpenMenu] = useState<boolean>(false);

	const handleScroll = () => {
		setTop(window.scrollY);
	};

	const handleClick = (status) => {
		setTimeout(() => {
			setOpenMenu(status);
		}, 100);
	};

	useEffect(() => {
		setTop(window.scrollY);
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.body.style.overflow = 'scroll';
		};
	}, []);

	useEffect(() => {
		document.body.style.overflow = openMenu ? 'hidden' : 'scroll';
	}, [openMenu]);

	useEffect(() => {
		const { commerceSlug, productSlug } = query;

		setCommerceLink(productSlug ? `/tienda/${commerceSlug}` : '');
	}, [query]);

	return (
		<CategoriesStyled>
			{openMenu ? (
				<div className="overlay">
					<MaxLayoutWidth>
						<div className="navigation-container">
							<CategoriesNavigation />
						</div>
					</MaxLayoutWidth>
				</div>
			) : null}
			<MaxLayoutWidth>
				<CategoriesContent className="flex">
					<div
						css={{
							display: 'none',
							[mq.lg]: { display: 'flex' }
						}}
					>
						<SelectCategories
							active={openMenu}
							handleClick={handleClick}
						/>
					</div>
					<div className="flex categories">
						<Breadcrumb />
						{commerceName ? (
							<h2
								className="bold commerce-title"
								style={{ top: top > 115 ? 0 : 115 - top }}
							>
								{commerceLink ? (
									<Link
										as={commerceLink}
										href="/tienda/[commerceSlug]"
									>
										<a>{commerceName}</a>
									</Link>
								) : (
									commerceName
								)}
							</h2>
						) : null}
					</div>
				</CategoriesContent>
			</MaxLayoutWidth>
		</CategoriesStyled>
	);
};

const CategoriesStyled = styled('div')`
	background: ${getColor('white')};
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.04);
	height: 40px;
	position: relative;

	.overlay {
		top: 100%;
		left: 0;
		width: 100%;
		height: calc(100vh);
		position: absolute;
		background: rgba(0, 0, 0, 0.23);
		z-index: 10000;
		overflow: scroll;

		.navigation-container {
			background: ${getColor('white')};
			height: auto;
			width: 200px;
			padding: 0;
		}
	}
`;

const CategoriesContent = styled('div')`
	align-items: stretch;
	justify-content: center;
	height: 100%;

	.categories {
		align-items: center;
		flex: 1;
		justify-content: center;
		overflow: hidden;
		position: relative;

		${mq.lg} {
			justify-content: flex-start;
		}
	}

	.commerce-title {
		color: ${getColor('red')};
		height: 40px;
		flex: 1;
		position: absolute;
		top: 100%;
		font-size: 16px;
		border: none;
		box-shadow: none;
		left: 0;
		right: 0;
		transition: 0.25 top linear;

		a {
			color: ${getColor('red')};
		}

		${mq.md} {
			font-size: 24px;
		}

		${mq.lg} {
			left: -160px;
		}
	}
`;

export default Categories;
