/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	ReactChild,
	ReactElement,
	useCallback,
	useEffect,
	useState
} from 'react';

import { Cart } from './Cart';
import Metrics from './Metrics';
import Sticky from './Sticky';

import { getColor, mq } from 'styles/utils';
import { useViewport } from 'hooks/useViewport';

type Props = {
	children: ReactChild;
	isHome: boolean;
	hideCart?: boolean;
	isCategory: boolean;
	isErrorPage: boolean;
	commerceName?: string;
	showCommerceName?: boolean;
	showRealTimeInfo: boolean;
};

const Page = ({
	isHome,
	isCategory,
	isErrorPage,
	children,
	commerceName,
	showCommerceName,
	showRealTimeInfo = false,
	hideCart = false
}: Props): ReactElement => {
	const { query } = useRouter();
	const { width } = useViewport();
	const [top, setTop] = useState<number>(12);

	const handleScroll = useCallback(() => {
		const paddingTop = window.scrollY > 40 ? (isHome ? 87 : 129) : 0;
		setTop(paddingTop);
	}, [isHome]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	return (
		<PageStyled className="flex column">
			{showCommerceName ? (
				<h2 className="flex row bold commerce-title">
					{query.productSlug ? (
						<Link
							href="/tienda/[commerceSlug]"
							as={`/tienda/${query.commerceSlug}`}
						>
							<span className="pointer back-button">
								<i className="icon-arrow"></i>
								<span>Ir a tienda</span>
							</span>
						</Link>
					) : null}
					{commerceName}
				</h2>
			) : null}
			<div className="flex row">
				<div
					className={`flex column content ${
						isErrorPage ? 'error' : ''
					}`}
				>
					{children}
				</div>
				{isErrorPage ? null : (
					<div
						className="sticky-container"
						style={{ paddingTop: isHome || isCategory ? 0 : 12 }}
					>
						{hideCart ? null : (
							<div className="cart-container" style={{ top }}>
								<Cart />
							</div>
						)}
						{showRealTimeInfo ? (
							<Sticky
								height={100}
								top={isHome ? 72 : 115}
								style={{
									position: 'absolute',
									right: 8,
									top: 12
								}}
							>
								<div
									css={{
										display: 'none',
										[mq.lg]: { display: 'block' }
									}}
									className="metrics-container"
									style={{
										top: isHome ? 85 : 125,
										right:
											width < 1520
												? 8
												: (width - 1520) / 2 + 8
									}}
								>
									<Metrics />
								</div>
							</Sticky>
						) : null}
					</div>
				)}
			</div>
		</PageStyled>
	);
};

const PageStyled = styled('section')`
	background: ${getColor('light_gray')};
	flex: 1;
	margin: auto;
	max-width: 1520px;
	padding: 10px 12px;
	position: relative;
	scroll-behavior: smooth;

	.content {
		width: 100%;
		min-height: 500px;

		${mq.xl} {
			&:not(.error) {
				width: calc(100% - 229px);
			}
		}
	}

	.sticky-container {
		display: none;
	}

	.commerce-title {
		font-size: 16px;
		position: relative;
		text-align: center;

		.back-button {
			color: ${getColor('green')};
			display: flex;
			align-items: center;
			font-size: 12px;
			left: 25px;
			line-height: 18px;
			position: absolute;
			top: 20px;

			i.icon-arrow {
				color: ${getColor('green')};
				font-size: 12px;
				margin-right: 10px;
			}
			span {
				display: none;
			}
		}

		${mq.md} {
			font-size: 24px;

			.back-button {
				span {
					display: block;
				}
			}
		}
	}

	.cart-container {
		position: sticky;
		top: 0;
	}

	.metrics-container {
		left: inherit !important;
	}

	${mq.md} {
		padding: 17px 17px 55px 19px;
	}

	${mq.lg} {
		justify-content: space-between;
		padding: 12px 45px 0;
	}

	${mq.xl} {
		padding: 12px 60px 0;

		.sticky-container {
			display: block;
		}
	}
`;

export default Page;
