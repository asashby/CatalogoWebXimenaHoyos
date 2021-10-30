import { Product } from './Product';
import { Promotion } from './Promotion';
import { LocationCoords } from './Order';

export interface Banners {
	[key: string]: {
		code: string;
		description: string;
		id: number;
		order: number;
		title: string;
		webImage: string;
	};
}

export interface Commerce {
	banners: Banners;
	data: CommerceData;
	facebookLive: FacebookLive;
	products: Product[];
	categories: Object[];
	promotions: Promotion[];
}

export interface FacebookLive {
	link: string;
	status: boolean;
}

type DeliveryType = {
	code: string;
	id: number;
	name: string;
}

type WayPaymentCommerceType = {
	code: string;
	commerceId: number;
	description: string;
	name: string;
	wayPaymentId: number;
}

export interface CommerceData {
	address?: string;
	city: string;
	code: string;
	deliveryType?: DeliveryType[];
	email: string;
	id: number;
	location?: LocationCoords;
	metas: CommerceDataMeta[];
	name: string;
	phone: string;
	rubro?: string;
	ruc: string;
	settings: CommerceDataSettings;
	slug: string;
	socialNetworks: SocialNetwork[];
	tokenStore: string;
	urlImage?: string;
	wayPaymentCommerce?: WayPaymentCommerceType[];
	whatsappNumber?: string;
}

export interface CommerceDataMeta {
	content: string;
	name?: string;
	property?: string;
}

export interface CommerceDataSettings {
	salPriceListId: number;
	flagGrouper: number;
	hash: string;
	minOrderPrice: number;
}

export interface SocialNetwork {
	code: string;
	link: string;
	logo: string;
}
