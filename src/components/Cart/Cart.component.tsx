import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Link from 'next/link';

import {
	Fragment,
	ReactElement,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';

import { AuthContext, AuthContextProps } from 'contexts/AuthContext';
import { CartContext, CartContextProps } from 'contexts/CartContext';

import CartIcon from 'components/icons/CartIcon';
import WhatsappIcon from 'components/icons/WhatsappIcon';
import StorePickUpIcon from 'components/icons/StorePickUpIcon';
import DeliveryPickUpIcon from 'components/icons/DeliveryPickUpIcon';
import { SimpleMap } from 'components/Map/map.component';

import { CartItem, CartItemMobile } from './CartItem.component';
import { Button } from 'components/Button';
import Input from 'components/Input';
import {
	MobileWrapperModal,
	MobileContentModal,
	MobileHeaderModal
} from 'components/Common';

import PreOrderService from 'services/PreOrderService';
import MiddlewareOrderService from 'services/MiddlewareOrderService';
import GooglePlaceApi from 'services/GooglePlaceServices';
import ShippingCostService from 'services/ShippingCostService';

import {
	BottomActionsStyled,
	ButtonsActionsContainerStyled,
	CartMobileFormStyled,
	CartStyled,
	CartDetailContainer,
	CartDetailTotal,
	CartPaymentDetail,
	CartMobileStyled,
	CartItemList,
	DeliveryTypeStyle,
	GpsCheckStyled,
	EmptyCart,
	SelectOptionStyled,
	TextAreaStryled
} from './Cart.styles';

import { AppContext, AppContextProps } from 'pages/_app';

import { WarehouseType, FormDataType, LocationCoords } from 'models/Order';
import { Commerce, CommerceData } from 'models/Commerce';

import {
	PaymentMethodsOptions,
	FlagPickUpOptions,
	CreditCard
} from 'utils/orderEnums';

import { getWhatsappLink, getWhatsAppMsg } from 'utils/whatsapp';
import { orderingProductsByCommerce } from 'utils/utils';
import { markLoadingError } from 'next/dist/next-server/lib/router/router';
import BankAccountService from 'services/BankAccountService';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

const CURRENCY = JSON.parse(applicationConfig.currency);
const TAX = JSON.parse(applicationConfig.countryTax);

const preOrderService = new PreOrderService();
const middlewareOrderService = new MiddlewareOrderService();
const googlePlaceApi = new GooglePlaceApi();
const shippingCostService = new ShippingCostService();

const amountsCalculate = (total: number, tax: number) => {
	const subtotal = total / Number(`1.${tax}`);
	const taxAmount = total - subtotal;
	return { total, subtotal: total, taxAmount };
};

const bankAccountService = new BankAccountService();

const renderProducts = (products, removeItem) => (
	<Fragment>
		{products.reverse().map((item) => (
			<CartItem
				key={`Cart-product-${item.product.id}`}
				cartItem={item}
				removeItem={removeItem}
			/>
		))}
	</Fragment>
);

const renderCartDetail = (
	currencySymbol: string,
	subtotal: number,
	taxAmount: number,
	taxName: string,
	total: number,
	shippingCost: number
) => (
	<Fragment>
		<CartPaymentDetail className="flex row">

			<div className="item">
				<span>Sub total:</span>
				<br />
				<span className="semi-bold">{currencySymbol} {subtotal.toFixed(2)}</span>
			</div>

			<div className="separator"></div>

			<div className="item">
				<span>Envío</span>
				<br />
				{shippingCost ?
					<span className="semi-bold">{currencySymbol} {shippingCost.toFixed(2)}</span>
					: <span className="semi-bold">Por definir</span>
				}
			</div>
		</CartPaymentDetail>

		<CartDetailTotal className="center semi-bold">
			Total {currencySymbol} {(total + shippingCost).toFixed(2) || '0.00'}
		</CartDetailTotal>
	</Fragment>
);

export const Cart = (): ReactElement => {
	const { cart, getTotal, removeProduct, shippingCost }: CartContextProps = useContext(
		CartContext
	);
	const { user }: AuthContextProps = useContext(AuthContext);
	const { openCartModal }: AppContextProps = useContext(AppContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { total, subtotal, taxAmount } = amountsCalculate(
		getTotal(),
		TAX.percentage
	);

	const groupedByCommerce = cart.reduce((acc, cur) => {
		const { nameCommerce } = cur.product;

		if (acc[nameCommerce]) {
			acc[nameCommerce].push(cur);
		} else {
			acc[nameCommerce] = [cur];
		}

		return acc;
	}, {});

	const handleOpenCartModal = () => {
		openCartModal();
	};

	return (
		<CartStyled>
			{renderCartDetail(
				CURRENCY.symbol,
				subtotal,
				taxAmount,
				TAX.name,
				total,
				shippingCost
			)}

			<CartItemList>
				{cart.length ? (
					Object.keys(groupedByCommerce).map((key) => (
						<Fragment key={`Cart-item-${key}`}>
							<h4 className="commerce-name">{key}</h4>
							{renderProducts(
								groupedByCommerce[key],
								removeProduct
							)}
						</Fragment>
					))
				) : (
					<EmptyCart className="flex column center">
						<span className="icon-cart"></span>
						<span className="text">Carrito vacio</span>
					</EmptyCart>
				)}
			</CartItemList>
			<Button
				variant="primary"
				className="cart-submit center semi-bold"
				disabled={!cart.length || isLoading}
				onClick={handleOpenCartModal}
			>
				{isLoading ? 'Cargando...' : 'Procesar Pago'}
			</Button>
		</CartStyled>
	);
};

type SummaryCartProps = {
	close: (newItem?: string) => void;
	setStep?: (newStep: number) => void;
	commerceData?: CommerceData;
	banks ?: any[];
};

type PlacesCoords = {
	lat: number;
	lng: number;
};

const SummaryCart = ({ close, setStep }: SummaryCartProps): ReactElement => {
	const {
		addProductToCart,
		cart,
		getTotal,
		removeProduct,
		shippingCost,
		updateShippingCost
	}: CartContextProps = useContext(CartContext);

	const [isLoading] = useState<boolean>(false);
	const { total, subtotal, taxAmount } = amountsCalculate(getTotal(), TAX.percentage);

	const handleProcessOrder = () => {
		setStep(2);
	};

	return (
		<MobileContentModal>
			<MobileHeaderModal className="flex space-between bold">
				<div className="flex">
					<i className="icon-arrow mr-1" onClick={() => close()}></i>
					<h3 className="mr-1">Carrito</h3>
					<CartIcon quantity={cart.length} />
				</div>
				<button type="button" onClick={() => close()}></button>
			</MobileHeaderModal>

			<CartMobileStyled>
				<CartDetailContainer>
					{renderCartDetail(
						CURRENCY.symbol,
						subtotal,
						taxAmount,
						TAX.name,
						total,
						shippingCost
					)}
				</CartDetailContainer>
				<Button
					variant="primary"
					className="cart-submit center semi-bold"
					disabled={!cart.length || isLoading}
					onClick={handleProcessOrder}
				>
					{isLoading ? 'Cargando...' : 'Procesar Pago'}
				</Button>
				<CartItemList>
					{cart.length ? (
						orderingProductsByCommerce(cart).map((item, i) => (
							<div key={`Commerce-${item.nameCommerce}-${i}`}>
								<h4 className="commerce-name capitalize">
									{item.nameCommerce}
								</h4>

								{item.cart.map(c => (
									<CartItemMobile
										key={`CartMobile-product-${c.product.id}`}
										cartItem={c}
										removeItem={removeProduct}
										updateItem={addProductToCart}
									/>
								))}
							</div>
						))
					) : (
						<EmptyCart className="flex column center">
							<span className="icon-cart"></span>
							<span className="text">Carrito vacio</span>
						</EmptyCart>
					)}
				</CartItemList>
			</CartMobileStyled>
		</MobileContentModal>
	);
};

const locationCoordsDefault = {
	x: null,
	y: null
};

const warehouseDefault = {
	address: '',
	id: 0,
	geoLocation: {
		x: null,
		y: null,
	},
	name: '',
}

const formDataDefault = {
	address: '',
	additionalInformation: '',
	codeTypeDelivery: '',
	lastname: '',
	locationCoords: {
		x: null,
		y: null
	},
	name: '',
	paymentType: '',
	phone: '',
  	warehouse: warehouseDefault 
};

const placesCoordsDefault = {
	lat: null,
	lng: null
};

export const SummaryCartForm = ({ close, setStep, commerceData, banks }: SummaryCartProps): ReactElement => {
	const {
		deliveryType,
		wayPaymentCommerce: paymentMethodsOptions,
		phone,
		settings,
		address,
		id,
		location: geoLocation,
		name,
	} = commerceData;
	const warehouses = [{ id, name, address, geoLocation }];
	const { minOrderPrice } = settings;
	const autoSelectDelivery = deliveryType.length === 1;

	const { cart, getTotal, clearCart, shippingCost, updateShippingCost }: CartContextProps = useContext(
		CartContext
	);
	const { user }: AuthContextProps = useContext(AuthContext);
	const { isMobile }: AppContextProps = useContext(AppContext);

	const router = useRouter();

	const [isCreditCard, setIsCreditCard] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDelivery, setIsDelivery] = useState<boolean>(true);
	const [invalidForm, setInvalidForm] = useState<boolean>(false);
	const [dirtyForm, setDirtyForm] = useState<boolean>(false);
	const [placeNotFound, setPlaceNotFound] = useState<boolean>(false);
	const [placesCoords, setPlacesCoords] = useState<PlacesCoords>(
		placesCoordsDefault
	);
	const [locationCoords, setLocationCoords] = useState<LocationCoords>(
		locationCoordsDefault
	);
	const [formData, setFormData] = useState<FormDataType>(formDataDefault);
	const [formHeight, setFormHeight] = useState<number>(0);
	const [warehouse, setWarehouse] = useState<WarehouseType>(warehouseDefault);
	const [shippingCostErrorMessage, setShippingCostErrorMessage] = useState<string>('');

	const schemaValidation = useMemo(() => {
		const baseValidation = ['name', 'lastname', 'phone', 'paymentType'];
		if (isDelivery) {
			return [...baseValidation, 'address'];
		}
		return baseValidation;
	}, [isDelivery]);

	const { total, taxAmount, subtotal } = amountsCalculate(getTotal(), TAX.percentage);
	const lowerAmount = total < minOrderPrice;

	const processOrder = async () => {
		setIsLoading(true);

		try {
			const { data } = await preOrderService.processOrder(cart, formData);

			localStorage.removeItem('cart');
			clearCart();
			router.replace(data.processUrl);
		} catch (err) {
		} finally {
			setIsLoading(false);
		}
	};

	const processOrderMiddleware = async () => {
		setIsLoading(true);

		try {
			await preOrderService.processOrderMiddleware(cart, formData, shippingCost);

			localStorage.removeItem('cart');
			clearCart();
			close();
		} catch (err) {
			console.log('Error al generar la pre-orden:', err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleBackAction = () => {
		setStep(1);
	};

	const handlePaymentMethods = (ev) => {
		handleUserForm(ev, 'paymentType');

		const { target: { value } } = ev;
		setIsCreditCard(value === CreditCard.code);
	};

	const handleFlagPickUp = (flag: string) => {
		const localFormData = { ...formData };
		localFormData.codeTypeDelivery = flag;

		setFormData({ ...localFormData });
		setIsDelivery(flag === FlagPickUpOptions.home.code);
	};

	const handleWarehouseClick = (ev) => {
		const warehouseId = Number(ev.target.value);
		const selectedWarehouse = warehouses.find(w => w.id === warehouseId) || warehouseDefault;
		setWarehouse({ ...selectedWarehouse });

		const localFormData = { ...formData };
		localFormData.warehouse = selectedWarehouse;
		setFormData({ ...localFormData });
	};

	const handleGpsLocation = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				({ coords }: Position) => {
					const { latitude, longitude } = coords;
					setLocationCoords({ x: latitude, y: longitude });
				}
			);
		}
	};

	const validationForm = () => {
		const invalidArr = [];
		Object.values(schemaValidation).forEach((key: string) => {
			invalidArr.push(!formData[key]);
		});
		const invalid = invalidArr.some((e: boolean) => e);

		setInvalidForm(invalid);
	};

	const handleUserForm = (ev, prop: string) => {
		if (!dirtyForm) {
			setDirtyForm(true);
		}
		const localFormData = { ...formData };

		const { target: { value } } = ev;
		localFormData[prop] = value;
		setFormData({ ...localFormData });

		// Si el campo es direccion y existe el valor establecer placeNotFound en false porque el usuario esta buscando
		if (prop === 'address' && value) {
			setPlaceNotFound(false);
		}

		// Si el campo es direccion y NO existe el valor, establecer las coordenadas en null porque el usuario borro la direccion
		if (prop === 'address' && !value) {
			setPlacesCoords({ lat: null, lng: null });
			setShippingCostErrorMessage('');
			updateShippingCost(0);
		}
	};

	const handlePaymentClick = async () => {
		if (dirtyForm) {
			await processOrder();
			updateShippingCost(0);
		} else {
			setDirtyForm(true);
			validationForm();
		}
	};

	const handleWhatsappClick = () => {
		if (dirtyForm) {
			const whatsAppLink = getWhatsappLink(phone);
			const whatsAppMsg = getWhatsAppMsg({
				formData,
				isDelivery,
				cart,
				total,
				currencySymbol: CURRENCY.symbol,
				placesCoords,
				shippingCost
			});

			processOrderMiddleware();
			updateShippingCost(0);
			window.open(`${whatsAppLink}&text=${whatsAppMsg}`);
			close();
		} else {
			setDirtyForm(true);
			validationForm();
			updateShippingCost(0);
		}
	};

	useEffect(() => {
		if (dirtyForm) {
			validationForm();
		}
	});

	useEffect(() => {
		const localFormData = { ...formData };
		const firstPaymentMethodElement = paymentMethodsOptions[0];
		const crediCardPayment = paymentMethodsOptions.find(p => p.code === CreditCard.code);
		const firstWarehouse = warehouses && warehouses.length && warehouses[0];

		if (crediCardPayment) {
			localFormData.paymentType = crediCardPayment.code;
		} else {
			localFormData.paymentType = firstPaymentMethodElement.code;
			setIsCreditCard(false);
		}

		const initDelivery = autoSelectDelivery ? deliveryType[0].code : FlagPickUpOptions.home.code;
		localFormData.codeTypeDelivery = initDelivery;

		if (firstWarehouse) {
		localFormData.warehouse = firstWarehouse;
			setWarehouse({ ...firstWarehouse });
		}

		setFormData({ ...localFormData });
		setIsDelivery(initDelivery === FlagPickUpOptions.home.code);
	}, []);
  
	const handleUserFormFocus = (ev) => {
		const { target } = ev;
		const label = target.previousElementSibling;
		if (label) {
			label.classList.add('hint');
		}
	};

	const getGooglePlaceLocation = async (place: string) => {
		setIsLoading(true);

		const localFormData = {
			locationCoords: { x: null, y: null },
			...formData
		};

		if (place) {
			const formattinPlace = encodeURIComponent(place);
			const response = await googlePlaceApi.getPlaces(formattinPlace);

			if (response.candidates.length) {
				const { location } = response.candidates[0].geometry;
				const { lat, lng } = location;

				localFormData.locationCoords = { x: lat, y: lng };

				setPlaceNotFound(false);
				setPlacesCoords({ lat, lng });
				setFormData({ ...localFormData });
			} else {
				setPlaceNotFound(true);
				setPlacesCoords({ lat: null, lng: null });
				setFormData({ ...localFormData });
			}
		} else {
			setPlaceNotFound(true);
			setPlacesCoords({ lat: null, lng: null });
			setFormData({ ...localFormData });
		}
		setIsLoading(false);
	};

	const handleUserFormBlur = (ev) => {
		const { target } = ev;
		const hasValue = target.value;

		if (!hasValue) {
			const label = target.previousElementSibling;
			label.classList.remove('hint');
		}
  	};

	const handleUserFormKeyUp = (ev): void => {
		if (ev.code === 'Enter' && ev.key === 'Enter') {
			updateShippingCost(0);
			getGooglePlaceLocation(ev.target.value);

			if (shippingCostErrorMessage) {
				setShippingCostErrorMessage('');
			}
		}
	}

	const handleGoogleSearch = (): void => {
		updateShippingCost(0);
		getGooglePlaceLocation(formData.address);

		if (shippingCostErrorMessage) {
			setShippingCostErrorMessage('');
		}
	}

	const handleApiLoaded = (map, maps) => {
		// establecer el Marcador dentro del mapa con la capacidad de ser arrastrado
		const marker = new maps.Marker({
			draggable: true,
			map,
			position: new maps.LatLng(placesCoords.lat, placesCoords.lng)
		});

		// escuchar cuando el marcador es arrastrado
		maps.event.addListener(marker, 'drag', function (ev) {
			// al arrastrar el marcador cambian las coordenadas y por eso el costo de envio debe ser Cero
			// para que el usuario recalcule presionando el boton
			updateShippingCost(0);

			const { latLng: { lat, lng } } = ev;

			const coords = {
				lat: lat(),
				lng: lng()
			};

			setPlacesCoords({ ...coords });

			const localFormData = {
				...formData,
				locationCoords: {
					x: coords.lat,
					y: coords.lng
				}
			};
			setFormData({ ...localFormData });
		});
	};

	const getProductToken = (): string => {
		const [firstProduct] = cart;
		return firstProduct.product.hashCommerce;
	}

	const handleShippingCostEvent = async () => {
		// consumir servicio que retornara costo de envio
		const productToken = getProductToken();
		const { statusCode, ...rest } = await shippingCostService.get(placesCoords, productToken);

		if (statusCode === 200) {
			const { costShipping: shippingCostCalculated, message } = rest;

			if (message) {
				setShippingCostErrorMessage(message);
				setPlacesCoords({ lat: null, lng: null });
			} else {
				updateShippingCost(shippingCostCalculated);
			}

			if (shippingCostErrorMessage) {
				setShippingCostErrorMessage('');
			}
		} else {
			const { errorMessage } = rest;
			setShippingCostErrorMessage(errorMessage);
			setPlacesCoords({ lat: null, lng: null });
		}
	}

	return (
		<MobileContentModal className="p-0 bg-white">

			<MobileHeaderModal className="flex space-between bold step-2--header">
				<div className="flex">
					<h4>Datos de envío</h4>
				</div>
				<button type="button" onClick={() => close()}></button>
			</MobileHeaderModal>

			<CartMobileStyled className="px-1 mb-0">
				<CartDetailContainer>
					<DeliveryTypeStyle>
						{deliveryType.map(del => (
							<div
								className="center"
								key={`delivery-button-${del.code}`}
							>
								{del.name === 'Recojo en Tienda' ?
									<DeliveryPickUpIcon
										active={formData.codeTypeDelivery === del.code}
									></DeliveryPickUpIcon>
									: <StorePickUpIcon
										active={formData.codeTypeDelivery === del.code}
									></StorePickUpIcon>}
								<button
									type="button"
									className={`${formData.codeTypeDelivery === del.code || autoSelectDelivery ? 'selected bold' : ''}`}
									onClick={() => handleFlagPickUp(del.code)}
								>{del.name}</button>
							</div>
						))}
					</DeliveryTypeStyle>


						{renderCartDetail(
							CURRENCY.symbol,
							subtotal,
							taxAmount,
							TAX.name,
							total,
							shippingCost
						)}

				</CartDetailContainer>
			</CartMobileStyled>

			<CartMobileFormStyled>
				<form action="">
					<Input
						label="Nombre"
						value={formData.name}
						onChange={() => handleUserForm(event, 'name')}
						onFocus={() => handleUserFormFocus(event)}
						onBlur={() => handleUserFormBlur(event)}
						hasError={dirtyForm && !formData.name}
						errorMessage="El nombre es requerido"
					/>

					<Input
						label="Apellido"
						value={formData.lastname}
						onChange={() => handleUserForm(event, 'lastname')}
						onFocus={() => handleUserFormFocus(event)}
						onBlur={() => handleUserFormBlur(event)}
						hasError={dirtyForm && !formData.lastname}
						errorMessage="El apellido es requerido"
					/>

					<Input
						type="tel"
						label="Celular"
						value={formData.phone}
						onChange={() => handleUserForm(event, 'phone')}
						onFocus={() => handleUserFormFocus(event)}
						onBlur={() => handleUserFormBlur(event)}
						hasError={dirtyForm && !formData.phone}
						errorMessage="El teléfono es requerido"
					/>

					<SelectOptionStyled>
						<select onChange={handlePaymentMethods}>
							{paymentMethodsOptions	&& paymentMethodsOptions.map(item => (
								<option
									key={`payment-option--${item.code}`}
									value={item.code}
								>{item.name}</option>
							))}
						</select>
						<p className="has-error"></p>
					</SelectOptionStyled>

					{!isDelivery && warehouses && warehouses.length ? 
						<SelectOptionStyled>
							<select onChange={handleWarehouseClick}>
								{warehouses && warehouses.map(item => (
									<option
										key={`warehouse-option--${item.id}`}
										value={item.id}
									>{item.name}</option>
								))}
							</select>

							{warehouse && warehouse.address ?
								<p className="warehouse-address">
									{warehouse.geoLocation && warehouse.geoLocation.x ?
										<Link
											href={`https://www.google.com/maps/search//?api=1&query=${warehouse.geoLocation.x},${warehouse.geoLocation.y}`}
										>
											<a target="_blank">
												Direccion: {warehouse && warehouse.address}
											</a>
										</Link>
									: <p className="warehouse-address">Direccion: {warehouse && warehouse.address}</p>}

								</p>
							: null }

						</SelectOptionStyled>
					: null}
					<div className="content-bank">
						{
							banks && banks.map(b => (
								<div key={b.id}>
									<p className="regular">
										<span className="semi-bold">{ b.name }:</span> { b.accountNumber }
										<p>{ b.additionalInformation.personName }</p>
									</p>
									{  b.accountNumberCi && (
										<p>
											<span className="semi-bold">{ b.bank.name } CCI:</span> { b.accountNumberCi }
											<p>{ b.additionalInformation.personName }</p>
										</p>
									)}
								</div>
							))
						}
					</div>
					{isDelivery ?
						<div className={'mb-3 mt-2'}>
							<div className={'relative'}>
								<Input
									externalClasses={'pr-4'}
									label="Dirección exacta"
									value={formData.address}
									onChange={() => handleUserForm(event, 'address')}
									onFocus={() => handleUserFormFocus(event)}
									onBlur={() => handleUserFormBlur(event)}
									onKeyUp={() => handleUserFormKeyUp(event)}
									hasError={dirtyForm && !formData.address}
									errorMessage="La dirección es requerida"
								/>

								{formData.address && !(placesCoords.lat && placesCoords.lng) ? 
									<button
										type="button"
										className={'google-map-press'}
										onClick={handleGoogleSearch}
									>
										<span className="icon-search"></span>
										<span className="ml-1">Ubicar direccion en el mapa</span>
									</button>
								: null }
							</div>
							{placesCoords.lat && placesCoords.lng ?
								<SimpleMap
									center={{
										lat: placesCoords.lat,
										lng: placesCoords.lng
									}}
									address={formData.address}
									zoom={15}
									isLoading={isLoading}
									onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
								/>
								: (formData.address && placeNotFound ?
								<div className={'center color-error mt-3'}>
									<h4>Lugar no encontrado</h4>
								</div>
								: null)}
						</div>
					: null}


					{placesCoords.lat && placesCoords.lng ?
						<TextAreaStryled>
							<label>Información adicional</label>
							<textarea
								name="additional-information"
								value={formData.additionalInformation}
								onChange={() => handleUserForm(event, 'additionalInformation')}
							/>

						</TextAreaStryled>
					: null }

					{placesCoords.lat && placesCoords.lng ?
						<div>
							{shippingCost ?

								<div>
									{renderCartDetail(
										CURRENCY.symbol,
										subtotal,
										taxAmount,
										TAX.name,
										total,
										shippingCost
									)}
								</div>
							:
								<button
									type="button"
									className={'shipping-cost-btn'}
									onClick={ handleShippingCostEvent }
								>
									<span className="ml-1">Calcular costo de envio</span>
								</button> }
						</div>

					: null }

					{shippingCostErrorMessage ?
						<h2 className="color-error center">{shippingCostErrorMessage}</h2>
					: null}

					{!isCreditCard && isDelivery && false ?
						<GpsCheckStyled>
							<Input type="radio" onChange={handleGpsLocation} />
							<label htmlFor="">Incluir mi ubicación GPS</label>
						</GpsCheckStyled>
					: null}
				</form>
			</CartMobileFormStyled>

			<BottomActionsStyled
				className={!isMobile ? 'btns-web-styles' : null}
			>
		{minOrderPrice ?
		  <small className="color-error">*El monto mínimo del pedido es {CURRENCY.symbol} {minOrderPrice}</small>
		: null}

				<ButtonsActionsContainerStyled>
					{isMobile ?
						<Button onClick={handleBackAction}>Atrás</Button>
					: null}
					{isCreditCard ?
						<Button
							disabled={invalidForm || isLoading || lowerAmount || placeNotFound}
							className="proccess"
							onClick={handlePaymentClick}
						>{ isLoading ? 'Cargando...' : 'Procesar Pago'}</Button>
					:
						<Button
							disabled={!shippingCost || (invalidForm || isLoading || lowerAmount)}
							className="whatsapp"
							onClick={handleWhatsappClick}
						>
							<WhatsappIcon></WhatsappIcon>
							<span className="ml-1">{ isLoading ? 'Cargando...' : 'Enviar por whatsapp'}</span>
						</Button>}
					</ButtonsActionsContainerStyled>
				</BottomActionsStyled>

		</MobileContentModal>
	)
} 

type CartMobileProps = {
	close: (newItem?: string) => void;
	show: boolean;
	commerceData: CommerceData;
	banks?: any[];
};

export const CartMobile = ({
	close,
	show,
	commerceData,
	banks
}: CartMobileProps): ReactElement => {
	const [step, setStep] = useState(1);

	return (
		<MobileWrapperModal
			className={`${show ? 'show' : ''} ${step === 2 ? 'p-0 bg-white' : ''}`}
		>
			{step === 1 ? 
				<SummaryCart close={close} setStep={setStep}></SummaryCart>
			:
				<SummaryCartForm
					close={close}
					setStep={setStep}
					commerceData={commerceData}
					banks={banks}
				></SummaryCartForm>}
		</MobileWrapperModal>
	);
};
