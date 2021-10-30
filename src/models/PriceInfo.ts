export interface PriceInfo {
	discount: number;
	price: number;
}

export interface PriceList {
	[key: number]: PriceInfo;
}
