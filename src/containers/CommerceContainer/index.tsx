import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';

import { db } from 'config/firebase-config';
import 'firebase/database';

import { Commerce, FacebookLive } from 'models/Commerce';
import { mq } from 'styles/utils';
import { ORDER_BY_DISCOUNT, SHOW_ALL } from 'Constants';
import { Product } from 'models/Product';
import BannerSection from './BannerSection';
import Categories from './Categories';
import Products from './Products';

type Props = {
	commerce: Commerce;
	isMobile?: boolean;
	url: string;
};

const CommerceContainer = ({ commerce, isMobile, url }: Props) => {
	const {
		data,
		banners,
		products: productList = {},
		facebookLive,
		promotions,
		categories,
	} = commerce;
	// console.log(commerce);
	const { name, slug, id, code, settings, tokenStore } = data;
	const [fbLive, setFbLive] = useState<FacebookLive>(facebookLive);
	const [showBy, setShowBy] = useState<string>(SHOW_ALL);
	const [orderBy, setOrderBy] = useState<string>(ORDER_BY_DISCOUNT);
	const commerceData = {
		name,
		slug,
		id,
		code,
		tokenStore,
	};

	const { salPriceListId } = settings;

	const products: Product[] = useMemo(() => {
		const products = [];

		Object.keys(productList).forEach((key) => {
			const product = productList[key];

			if (product.priceList && !key.includes('--')) {
				products.push({ ...product, slug: key });
			}
		});

		return products;
	}, []);

	const productsByCategory = useMemo(() => {
		const result = {};

		if (!categories) {
			return [];
		}

		Object.keys(categories).forEach((name) => {
			const { id } = categories[name];

			result[id] = { name, data: [] };
		});

		products.forEach((product) => {
			product.eCategories.forEach((categoryId) => {
				if (result[categoryId]) {
					result[categoryId].data.push(product);
				}
			});
		});

		return Object.keys(result)
			.map((key) => {
				const { name, data } = result[key];

				if (data.length) {
					return (
						<Products
							key={`CommerceContainer-Products-${name}`}
							data={data}
							category={name}
							commerceData={commerceData}
							orderBy={orderBy}
							salPriceListId={salPriceListId}
						/>
					);
				}

				return null;
			})
			.filter((item) => !!item);
	}, [orderBy]);

	useEffect(() => {
		(() => {
			db.ref(url).on('value', (data) => {
				const { facebookLive } = data.val();

				setFbLive(facebookLive);
			});
		})();
	}, []);

	return (
		<CommerceContainerStyled className="flex column">
			<BannerSection
				banners={banners}
				commerceInfo={data}
				fbLive={fbLive}
				promotions={promotions}
			/>
			<Categories
				total={products.length}
				handleChangeShowBy={setShowBy}
				handleChangeOrderBy={setOrderBy}
				isMobile={isMobile}
			/>
			{showBy === SHOW_ALL || !categories ? (
				<Products
					data={products}
					commerceData={commerceData}
					orderBy={orderBy}
					salPriceListId={settings?.salPriceListId}
				/>
			) : (
				productsByCategory
			)}
		</CommerceContainerStyled>
	);
};

const CommerceContainerStyled = styled('main')`
	margin-top: 12px;

	${mq.xl} {
		margin-right: 12px;
	}
`;

export default CommerceContainer;
