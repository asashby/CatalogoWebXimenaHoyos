import Link from 'next/link';
import { Fragment, ReactElement, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
	CategoriesNavigationList,
	CategoriesNavigationItem,
	CategoriesNavigationSubMenu,
	CategoriesNavigationSubMenuList,
	CategoriesNavigationSubMenuItem,
	Mypes,
	MypesProducts
} from './CategoriesNavigation.styles';

import { CATEGORY_ITEMS } from 'Constants';
import { Category } from 'models/Category';

export const CategoriesNavigation = (): ReactElement => {
	const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
	const [subMenuItems, setSubMenuItems] = useState([]);
	const [currentCategorySlug, setCurrentCategorySlug] = useState(null);

	const handleMouseOver = ({ slug, subCategories }: Category) => {
		setCurrentCategorySlug(slug);
		setSubMenuItems(subCategories);
		setShowSubMenu(true);
	};

	const handleMouseLeave = () => {
		setShowSubMenu(false);
	};

	return (
		<Fragment>
			<CategoriesNavigationList
				className="menu"
				onMouseLeave={handleMouseLeave}
			>
				{CATEGORY_ITEMS.map((item) => (
					<CategoriesNavigationItem
						className="menu-item flex row pointer medium"
						key={`CategoriesNavigation-menu-item-${item.name}`}
						onMouseOver={() => handleMouseOver(item)}
					>
						<Link
							as={`/categoria/${item.slug}`}
							href={'/categoria/[item.slug]'}
						>
							<a>
								<i className={`icon-${item.icon}`} />
								{item.name}
							</a>
						</Link>
					</CategoriesNavigationItem>
				))}
				<CategoriesNavigationSubMenu
					className={`flex row ${showSubMenu ? 'show' : ''}`}
				>
					<CategoriesNavigationSubMenuList>
						{subMenuItems.map((sub) => (
							<CategoriesNavigationSubMenuItem
								className={'pointer'}
								key={`CategoriesNavigation-submenu-item-${sub.slug}`}
							>
								<Link
									href={`/categoria/${currentCategorySlug}/${sub.slug}`}
								>
									<a>
										<span>{sub.name}</span>
									</a>
								</Link>
							</CategoriesNavigationSubMenuItem>
						))}
					</CategoriesNavigationSubMenuList>
					<Mypes className="flex row">
						<MypesProducts className="flex column">
							{subMenuItems.slice(0, 1).map((sub) => (
								<picture
									key={`Mypes-MypesProducts-banner-item-${sub.slug}`}
								>
									<LazyLoadImage
										src={`/images/banners/subcategories/${sub.slug}.png`}
										alt={sub.name}
									/>
								</picture>
							))}
						</MypesProducts>
					</Mypes>
				</CategoriesNavigationSubMenu>
			</CategoriesNavigationList>
		</Fragment>
	);
};
