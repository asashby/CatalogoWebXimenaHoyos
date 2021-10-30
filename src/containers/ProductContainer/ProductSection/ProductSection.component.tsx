import {
	ProductSection as ProductSectionModel,
	ProductSubSection as ProductSubSectionModel
} from 'models/ProductSection';
import React, { ReactElement, useMemo, useState } from 'react';

import {
	ProductSectionStyled,
	ProductSectionToggle,
	ProductSectionTitle,
	ProductSectionToogleIcon,
	ProductSectionContent,
	ProductSubSectionStyled,
	ProductSubSectionTitle,
	ProductSubSectionDescription,
	ProductSubSectionImage
} from './ProductSection.styles';

type ProductSubSectionProps = {
	subSection: ProductSubSectionModel;
};

const ProductSubSection = ({
	subSection
}: ProductSubSectionProps): ReactElement => (
	<ProductSubSectionStyled className="fade-in">
		{subSection.title ? (
			<ProductSubSectionTitle className="medium">
				{subSection.title}
			</ProductSubSectionTitle>
		) : null}
		<ProductSubSectionDescription>
			{subSection.description}
		</ProductSubSectionDescription>
		{subSection.urlImage ? (
			<ProductSubSectionImage>
				<img src={subSection.urlImage} alt={subSection.title} />
			</ProductSubSectionImage>
		) : null}
	</ProductSubSectionStyled>
);

type Props = {
	data: ProductSectionModel;
	productDescripcion: string;
};

export const ProductSection = ({
	data,
	productDescripcion
}: Props): ReactElement => {
	const { name, subSections } = data;
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

	const handleClick = (): void => {
		setIsCollapsed((current) => !current);
	};

	const subSectionItems = useMemo(() => {
		if (
			!subSections.length ||
			subSections[0].title.toLowerCase() === 'no hay seccion'
		) {
			return [
				{
					id: 1,
					description: productDescripcion,
					urlImage: '',
					title: ''
				}
			];
		}

		return subSections;
	}, []);

	return (
		<ProductSectionStyled className="container flex column">
			<ProductSectionToggle
				className="flex row pointer"
				onClick={handleClick}
			>
				<ProductSectionTitle className="bold">
					{name}
				</ProductSectionTitle>
				<ProductSectionToogleIcon
					className={isCollapsed ? 'active' : ''}
				/>
			</ProductSectionToggle>
			{isCollapsed && (
				<ProductSectionContent>
					{subSectionItems.map(
						(subSection: ProductSubSectionModel) => (
							<ProductSubSection
								key={`ProductSection-subSection-${subSection.id}`}
								subSection={subSection}
							/>
						)
					)}
				</ProductSectionContent>
			)}
		</ProductSectionStyled>
	);
};
