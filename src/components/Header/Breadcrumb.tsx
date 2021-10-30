import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMemo } from 'react';

import styled from '@emotion/styled';
import { getColor } from 'styles/utils';

const Breadcrumb: React.FunctionComponent = () => {
	const { query, pathname } = useRouter();

	const breadcrumb = useMemo(() => {
		const paths = [{ name: 'Home', href: '/', as: '/' }];
		const {
			categorySlug,
			subcategorySlug,
			commerceSlug,
			productSlug
		} = query;

		if (categorySlug && typeof categorySlug === 'string') {
			paths.push({
				name: `/  ${categorySlug.split('-').join(' ')}`,
				href: '/categoria/[categorySlug]',
				as: `/categoria/${categorySlug}`
			});
		}

		if (subcategorySlug && typeof subcategorySlug === 'string') {
			paths.push({
				name: `/  ${subcategorySlug.split('-').join(' ')}`,
				href: '/categoria/[categorySlug]/[subcategorySlug]',
				as: `/categoria/${categorySlug}/${subcategorySlug}`
			});
		}

		if (commerceSlug && typeof commerceSlug === 'string') {
			paths.push({
				name: `/  ${commerceSlug.split('-').join(' ')}`,
				href: '/tienda/[commerceSlug]',
				as: `/tienda/${commerceSlug}`
			});
		}

		if (productSlug && typeof productSlug === 'string') {
			paths.push({
				name: `/  ${productSlug.split('-').join(' ')}`,
				href: '/tienda/[commerceSlug]/[productSlug]',
				as: `/tienda/${categorySlug}/${productSlug}`
			});
		}

		return paths;
	}, [query]);

	return (
		<BreadcrumbWrapper>
			<Links className="flex">
				{breadcrumb.map((path) =>
					path.href !== pathname ? (
						<Link
							href={path.href}
							as={path.as}
							key={`Breadcrumb-item-${path.name}`}
						>
							<a className="capitalize">{path.name}</a>
						</Link>
					) : (
						<span
							key={`Breadcrumb-item-${path.name}`}
							className="capitalize"
						>
							{path.name}
						</span>
					)
				)}
			</Links>
		</BreadcrumbWrapper>
	);
};

export const BreadcrumbWrapper = styled('div')`
	margin-left: 13px;
`;

export const Links = styled('div')`
	color: ${getColor('dark_gray')};
	font-size: 12px;

	a {
		color: inherit;
		margin-right: 4px;

		&:hover {
			color: ${getColor('black')};
		}
	}
`;

export default Breadcrumb;
