import { ProductCard } from 'components/ProductCard';
import { Product } from 'models/Product';
import { Promotion } from 'models/Promotion';
import { memo, ReactElement } from 'react';
import { default as ResponsiveCarousel } from 'react-multi-carousel';

import {
	Item,
	SingleCarouselItem,
	MultiProductsCarouselItem
} from './CarouselItem.component';

type Props = {
	items: Item[];
};

export const SingleCarousel = memo(({ items }: Props) => {
	let carouselProps;
	const defaultProps = {
		responsive: {
			mobile: {
				breakpoint: { max: 3000, min: 0 },
				items: 1
			}
		},
		arrows: false,
		showDots: true,
		containerClass: 'carousel',
		itemClass: 'carousel--single',
		dotListClass: 'carousel__dots',
		autoPlay: true,
		ssr: true,
		infinite: true,
		autoPlaySpeed: 5000,
		transitionDuration: 1000
	};

	if (items.length < 2) {
		carouselProps = {
			showDots: false,
			autoPlay: false,
			infinite: false
		};
	}

	return (
		<ResponsiveCarousel {...{ ...defaultProps, ...carouselProps }}>
			{items.map((item) => (
				<SingleCarouselItem key={item.id} {...item} />
			))}
		</ResponsiveCarousel>
	);
});

type MultiCarouselProps = {
	children: ReactElement[];
	desktop?: number;
	tablet?: number;
	mobile?: number;
	itemClass?: string;
};

export const MultiCarousel = ({
	children,
	desktop = 4,
	tablet = 2,
	mobile = 1,
	itemClass = 'carousel--multi'
}: MultiCarouselProps) => {
	let carouselProps;

	const defaultProps = {
		responsive: {
			desktop: {
				breakpoint: { max: 4000, min: 1024 },
				items: desktop
			},
			tablet: {
				breakpoint: { max: 1024, min: 480 },
				items: tablet
			},
			mobile: {
				breakpoint: { max: 480, min: 0 },
				items: mobile
			}
		},
		centerMode: true,
		arrows: true,
		showDots: false,
		containerClass: 'carousel',
		itemClass,
		autoPlay: true,
		ssr: true,
		infinite: true,
		autoPlaySpeed: 5000,
		transitionDuration: 1000
	};

	if (children.length < 2) {
		carouselProps = {
			showDots: false,
			autoPlay: false,
			infinite: false
		};
	}

	return (
		<ResponsiveCarousel {...{ ...defaultProps, ...carouselProps }}>
			{[...children]}
		</ResponsiveCarousel>
	);
};

type MultiCarouselCategoriesProps = {
	products: Product[];
};

export const MultiCarouselCategories = ({
	products
}: MultiCarouselCategoriesProps) => {
	let carouselProps;

	const defaultProps = {
		responsive: {
			desktop: {
				breakpoint: { max: 4000, min: 1024 },
				items: 4
			},
			tablet: {
				breakpoint: { max: 1024, min: 800 },
				items: 3,
				slidesToSlide: 3
			},
			tabletSm: {
				breakpoint: { max: 800, min: 600 },
				items: 2,
				slidesToSlide: 2
			},
			mobile: {
				breakpoint: { max: 600, min: 0 },
				items: 1,
				slidesToSlide: 1,
				partialVisibilityGutter: 0
			}
		},
		centerMode: false,
		arrows: true,
		showDots: false,
		containerClass: 'carousel-categories',
		autoPlay: true,
		ssr: true,
		infinite: true,
		autoPlaySpeed: 5000,
		transitionDuration: 1000
	};

	if (products.length < 2) {
		carouselProps = {
			showDots: false,
			autoPlay: false,
			infinite: false
		};
	}

	return (
		<ResponsiveCarousel {...{ ...defaultProps, ...carouselProps }}>
			{products.map((product) => (
				<ProductCard
					product={product}
					showButton={false}
					key={`MultiCarouselCategories-item-${product.id}`}
				/>
			))}
		</ResponsiveCarousel>
	);
};

type MultiProductsCarouselProps = {
	items: Promotion[];
};

export const MultiProductsCarousel = ({
	items
}: MultiProductsCarouselProps) => {
	const carouselProps = {
		responsive: {
			desktopLg: {
				breakpoint: { max: 2000, min: 1600 },
				items: 6,
				slidesToSlide: 6
			},
			desktop: {
				breakpoint: { max: 1600, min: 1300 },
				items: 5,
				slidesToSlide: 5
			},
			DesktopSm: {
				breakpoint: { max: 1300, min: 1100 },
				items: 4,
				slidesToSlide: 4
			},
			tablet: {
				breakpoint: { max: 1100, min: 800 },
				items: 3,
				slidesToSlide: 3
			},
			tabletSm: {
				breakpoint: { max: 800, min: 600 },
				items: 2,
				slidesToSlide: 2
			},
			mobile: {
				breakpoint: { max: 600, min: 0 },
				items: 1,
				slidesToSlide: 1,
				partialVisibilityGutter: 0
			}
		},
		centerMode: true,
		arrows: true,
		showDots: false,
		containerClass: 'carousel',
		itemClass: 'carousel--multi',
		autoPlay: true,
		ssr: true,
		infinite: true,
		autoPlaySpeed: 5000,
		transitionDuration: 1000
	};

	return (
		<ResponsiveCarousel {...carouselProps}>
			{items.map((item) => (
				<MultiProductsCarouselItem key={item.id} {...item} />
			))}
		</ResponsiveCarousel>
	);
};
