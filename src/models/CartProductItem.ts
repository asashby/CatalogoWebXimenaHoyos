import { Product } from './Product';

export interface CartProductItem {
	quantity: number;
	product: Partial<Product>;
}
