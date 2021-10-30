export interface SubCategory {
	name: string;
	slug: string;
}

export interface Category {
	name: string;
	icon: string;
	slug: string;
	subCategories: SubCategory[];
}
