export interface Promotion {
	description: string;
	endDate: Date;
	id: number;
	percentage: number;
	price: number;
	productId: number | string;
	productName: string;
	promotionTime: string;
	quantity: number;
	salelink: string;
	startDate: Date;
}
