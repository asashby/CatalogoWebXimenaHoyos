export interface ProductSection {
	id: number;
	name: string;
	subSections: ProductSubSection[];
}

export interface ProductSubSection {
	description?: string;
	id: number;
	name?: string;
	order?: number;
	title?: string;
	urlImage?: string;
}
