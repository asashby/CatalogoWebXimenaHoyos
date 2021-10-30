type PreOrderProductType = {
    amount: number;
    codeCommerce: string;
    commerceId: number;
    description: string;
    hashCommerce: string;
    id: number;
    name: string;
    nameCommerce: string;
    price: number;
    priceListId: number;
    quantity: number;
    unitId: number;
    urlImage: string;
    warehouseId: number;
}
type Customer = {
    name: string;
}
export interface MiddlewareOrderData  {
    hashCommerce: string;
    customer: Customer | {};
    customerAddressId: number;
    flagPickUp: number;
    makiId: number;
    orderCode: number;
    origin: string;
    products: PreOrderProductType[];
    status: string;
}

export type LocationCoords = {
	x?: number;
	y?: number;
}

export type FormDataType = {
	address?: string;
	additionalInformation?: string;
    codeTypeDelivery: string;
	lastname: string;
	locationCoords?: LocationCoords;
	name: string;
	paymentType: string;
  phone: string;
  warehouse: WarehouseType;
}
export type WarehouseType = {
  address: string;
  id: number;
  geoLocation?: LocationCoords;
  name: string;
}
