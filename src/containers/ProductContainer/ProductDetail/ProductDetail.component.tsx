import { useRouter } from 'next/router';
import React, {
	ReactElement,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';
import is from 'ramda/src/is';

import {
	ProductDetailStyled,
	ProductDetailName,
	ProductDetailCommerceName,
	ProductDetailCode,
	ProductDetailPrices,
	ProductDetailSales,
	ProductDetailActionsStyled,
	ProductDetailActionsInput,
	ProductDetailActionsButtons,
	ProductDetailActionsButton,
	ProductDetailActionSubmit,
	ProductFeaturesStyled,
	ProductFeature,
	ProductFeatureName,
	ProductFeatureItems,
	ProductFeatureItem
} from './ProductDetail.styles';

import { Product } from 'models/Product';
import { Rating } from 'components/Rating';
import { CartContext } from 'contexts/CartContext';
import ProductService from 'services/ProductService';
import { getPriceWithoutDiscount } from 'utils/utils';
import { CommerceData } from 'models/Commerce';
import { HAS_VARIATIONS } from 'Constants';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

const currency = JSON.parse(applicationConfig.currency);

const productService = new ProductService();

type ProductFeaturesProps = {
	selectProduct: (product: Product) => void;
	products: Product[];
};

const ProductFeatures = ({ products, selectProduct }: ProductFeaturesProps) => {
	const [featureValues, setFeatureValues] = useState({});

	const features = useMemo(() => {
		const features = {};

		products.forEach((product) => {
			product.features.forEach(({ id, name, value }) => {
				if (features[id]) {
					if (!features[id].values.includes(value)) {
						features[id].values.push(value);
					}
				} else {
					features[id] = { name, values: [value] };
				}
			});
		});

		return features;
	}, []);

	const handleSelectedFeatureValue = (evt: React.MouseEvent): void => {
		const [key, value] = evt.currentTarget
			.getAttribute('data-variation')
			.split('-');

		setFeatureValues((current) => {
			const keys = Object.keys(current);

			if (keys.length > 1) {
				const newValues = {};

				products.some((product) => {
					const hasFound = product.features.some(
						(feature) =>
							feature.id === +key && feature.value === value
					);

					if (hasFound) {
						product.features.forEach(({ id, value }) => {
							newValues[id] = value;
						});
					}

					return hasFound;
				});

				return { ...newValues };
			} else {
				return { [key]: value };
			}
		});
	};

	useEffect(() => {
		const values = {};
		const [product] = products;

		product.features.forEach(({ id, value }) => (values[id] = value));

		setFeatureValues(values);
		selectProduct(product);
	}, []);

	useEffect(() => {
		products.some((product: Product) => {
			const hasFound = product.features.every(
				({ id, value }) => featureValues[id] === value
			);

			if (hasFound) {
				selectProduct(product);
			}

			return hasFound;
		});
	}, [featureValues]);

	return (
		<ProductFeaturesStyled className="fade-in">
			{Object.keys(features).map((key) => (
				<ProductFeature key={`ChildProducts-feature-${key}`}>
					<ProductFeatureName className="semi-bold capitalize">
						{features[key].name}
					</ProductFeatureName>
					<ProductFeatureItems className="flex row">
						{features[key].values.map((value, index) => (
							<ProductFeatureItem
								key={`ChildProducts-feature-item-${value}-${index}`}
								data-variation={`${key}-${value}`}
								className={`medium pointer
									${value.length < 3 ? 'upper' : 'capitalize'}
									${featureValues[key] === value ? 'selected' : ''}
								`}
								onClick={handleSelectedFeatureValue}
							>
								{value}
							</ProductFeatureItem>
						))}
					</ProductFeatureItems>
				</ProductFeature>
			))}
		</ProductFeaturesStyled>
	);
};

type ProductDetailActionsProps = {
	addToCart: (quantity: number) => void;
	maxValue: number;
	value: number;
};

const ProductDetailActions = ({
	addToCart,
	maxValue,
	value = 1
}: ProductDetailActionsProps): ReactElement => {
	const [quantity, setQuantity] = useState<number>(value);

	const handleChangeQuantity = (evt): void => {
		const value = parseInt(evt.target.value, 10);

		if (value && is(Number, value) && value <= maxValue) {
			setQuantity(value);
		} else if (!value) {
			setQuantity(0);
		} else {
			evt.preventDefault();
		}
	};

	const handleUpdateQuantity = (evt): void => {
		const value = parseInt(evt.target.getAttribute('data-value'), 10);

		setQuantity((current) => {
			const newValue = current + value;

			return newValue <= maxValue && newValue >= 0 ? newValue : current;
		});
	};

	const handleAddToCart = (): void => {
		addToCart(quantity);
	};

	return (
		<ProductDetailActionsStyled className="flex row">
			<ProductDetailActionsInput
				type="text"
				value={quantity}
				onChange={handleChangeQuantity}
			/>
			<ProductDetailActionsButtons className="flex column">
				<ProductDetailActionsButton
					data-value="1"
					disabled={quantity === maxValue}
					onClick={handleUpdateQuantity}
				>
					+
				</ProductDetailActionsButton>
				<ProductDetailActionsButton
					data-value="-1"
					disabled={!quantity}
					onClick={handleUpdateQuantity}
				>
					-
				</ProductDetailActionsButton>
			</ProductDetailActionsButtons>
			<ProductDetailActionSubmit
				className="bold"
				disabled={!quantity}
				onClick={handleAddToCart}
			>
				Agregar al carrito
			</ProductDetailActionSubmit>
		</ProductDetailActionsStyled>
	);
};

type ProductDetailProps = {
	commerceData: Partial<CommerceData>;
	product: Product;
	salPriceListId: number | string;
	setImages: (images: Array<any>) => void;
};

export const ProductDetail = ({
	setImages,
	product,
	commerceData,
	salPriceListId
}: ProductDetailProps): ReactElement => {
	const { query } = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [selectedProduct, selectProduct] = useState<Product>();
	const { addProductToCart, cart } = useContext(CartContext);
	const [childProducts, setChildProducts] = useState<Product[]>([]);
	const { discount, price, newPrice } = useMemo(() => {
		if (selectedProduct && selectedProduct.priceList) {
			const { discount, price } = selectedProduct?.priceList[
				salPriceListId
			];
			const newPrice = getPriceWithoutDiscount(price, discount);

			return { discount, price, newPrice };
		}

		return {};
	}, [selectedProduct]);

	const {
		name: nameCommerce,
		id: commerceId,
		code: codeCommerce,
		tokenStore: hashCommerce,
	} = commerceData;

	const productFromCart: Product = useMemo(() => {
		let temporal;

		cart.some((item) => {
			if (item.product.id === product.id) {
				temporal = item;
				return true;
			}

			return false;
		});

		return temporal;
	}, []);

	const handleAdd = (quantity: number) => {
		const {
			description,
			id,
			name,
			unitId,
			warehouseProduct,
			images,
			weigth,
			stock
		} = selectedProduct;

		addProductToCart(
			{
				nameCommerce,
				commerceId,
				codeCommerce,
				description,
				hashCommerce,
				id,
				name,
				stock,
				price: newPrice,
				priceListId: salPriceListId,
				unitId,
				urlImage: images[0]?.urlImage || '',
				warehouseId: warehouseProduct?.warehouseId,
				weigth
			},
			quantity,
			true
		);
	};

	useEffect(() => {
		const getChildProducts = async () => {
			const response = await productService.getVariationsProducts(query);

			if (response.length) {
				setChildProducts(response);
			} else {
				selectProduct(product);
			}
		};

		if (product.type === HAS_VARIATIONS) {
			getChildProducts();
		} else {
			selectProduct(product);
		}
	}, []);

	useEffect(() => {
		if (selectedProduct) {
			setImages(selectedProduct.images);
			setIsLoading(false);
		}
	}, [selectedProduct]);

	return (
		<ProductDetailStyled className="flex column">
			{isLoading ? null : (
				<>
					<ProductDetailName className="regular">
						{selectedProduct.name}
					</ProductDetailName>
					<ProductDetailCommerceName className="bold">
						{nameCommerce}
					</ProductDetailCommerceName>
					<ProductDetailCode className="medium">
						Code-{selectedProduct.code}
					</ProductDetailCode>
					<ProductDetailPrices className="flex row">
						<span className="now extra-bold">{currency.symbol} {newPrice}</span>
						{discount ? (
							<span className="before medium">
								{currency.symbol}{price.toFixed(2)}
							</span>
						) : null}
					</ProductDetailPrices>
					<ProductDetailSales className="flex row">
						<span>
							<Rating value={product.rating} />
							{product.comments && (
								<a
									href="#comments-section"
									className="semi-bold"
								>
									Calificar
								</a>
							)}
						</span>
					</ProductDetailSales>
				</>
			)}
			{product.type === HAS_VARIATIONS && childProducts.length ? (
				<ProductFeatures
					selectProduct={selectProduct}
					products={childProducts}
				/>
			) : null}
			{isLoading ? null : (
				<ProductDetailActions
					value={productFromCart?.quantity}
					maxValue={selectedProduct.stock}
					addToCart={handleAdd}
				/>
			)}
		</ProductDetailStyled>
	);
};
