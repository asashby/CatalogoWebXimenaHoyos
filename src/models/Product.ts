import { PriceList } from './PriceInfo';
import { ProductFeature } from './ProductFeature';
import { ProductSection } from './ProductSection';

export interface Product {
	code: string;
	comments: boolean;
	commerceSlug?: string;
	commerceName?: string;
	description?: string;
	discount?: number;
	eCategories: number[];
	groupType: number;
	hashCommerce?: string;
	id: number;
	features: ProductFeature[];
	images: Array<{ [key: string]: string }>;
	name: string;
	price: number;
	priceList: PriceList;
	sections: ProductSection[];
	slug: string;
	subItemSlug?: string;
	stock: number;
	urlImage: string;
	weigth: number;
	[key: string]: any;
}
