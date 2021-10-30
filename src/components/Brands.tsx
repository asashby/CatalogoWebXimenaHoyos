import { LazyLoadImage } from 'react-lazy-load-image-component';
import clsx from 'clsx';
import styled from '@emotion/styled';

import { getColor } from 'styles/utils';

const BATCH_1 = [
	{
		title: 'NOS ACOMPAÑAN EN ESTE PROPÓSITO',
		sponsors: [
			{
				image: '/images/brands/visa@3x.png',
				name: 'Visa'
			},
			{
				image: '/images/brands/elcomercio@3x.png',
				name: 'El Comercio'
			},
			{
				image: '/images/brands/cesarVallejo@3x.png',
				name: 'Universidad Cesar Vallejo'
			},
			{
				image: '/images/brands/clearChanel@3x.png',
				name: 'Clear Channel'
			},
			{
				image: '/images/brands/microsoft@3x.png',
				name: 'Microsoft'
			},
			{
				image: '/images/brands/mibanco@3x.png',
				name: 'Mi Banco'
			},
			{
				image: '/images/brands/publicis@3x.png',
				name: 'Publicis'
			}
		]
	},
	{
		title: 'EMPRESAS LOGÍSTICAS COMPROMETIDAS CON EL PAÍS',
		sponsors: [
			{
				image: '/images/brands/olva@3x.png',
				name: 'Olva'
			},
			{
				image: '/images/brands/inka@3x.png',
				name: 'Inka'
			},
			{
				image: '/images/brands/qayarix@3x.png',
				name: 'Qayarix'
			},
			{
				image: '/images/brands/savar@3x.png',
				name: 'Savar'
			}
		]
	},
	{
		title: 'CON LA PARTICIPACIÓN DE',
		sponsors: [
			{
				image: '/images/brands/tuempresa@3x.png',
				name: 'Tu Empresa'
			},
			{
				image: '/images/brands/niubox@3x.png',
				name: 'Niubox'
			}
		]
	}
];

type Sponsor = {
	image: string;
	name: string;
};

type Batch = {
	title: string;
	sponsors: Sponsor[];
};

type RenderBatchProps = {
	batch: Batch[];
	column?: boolean;
	className?: string;
};

const RenderBatch = ({
	batch,
	column = false,
	className
}: RenderBatchProps) => {
	const classes = {
		root: clsx([
			className,
			'flex',
			column && 'column',
			column ? 'center' : 'space-around',
			!column && 'w-full'
		]),
		item: clsx([column ? 'column' : 'row'])
	};

	return (
		<div className={classes.root}>
			{batch.map(({ title, sponsors }, i) => (
				<BatchItem className={classes.item} key={`${title}-${i}`}>
					<BatchTitle>{title}</BatchTitle>
					<BatchSponsorContainer>
						{sponsors.map(({ image, name }, o) => (
							<BatchSponsor key={`${name}-${o}`}>
								<LazyLoadImage src={image} alt={name} />
							</BatchSponsor>
						))}
					</BatchSponsorContainer>
				</BatchItem>
			))}
		</div>
	);
};

const BatchTitle = styled('h3')`
	color: ${getColor('red')};
	font-size: 12px;
	font-weight: bold;
	margin-bottom: 10px;
	text-align: center;
	text-transform: uppercase;
`;

const BatchItem = styled('div')`
	&.column {
		margin-bottom: 50px;

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	&.row {
		min-width: 200px;
	}
`;

const BatchSponsorContainer = styled('ul')`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const BatchSponsor = styled('li')`
	display: inline-block;
	margin: 5px 10px;

	img {
		height: 51px;
		object-fit: contain;
		width: 180px;
	}
`;

const Brands: React.FunctionComponent = () => {
	return (
		<BrandsWrapper className="flex column center">
			<RenderBatch batch={BATCH_1} column />
		</BrandsWrapper>
	);
};

const BrandsWrapper = styled('section')`
	background-color: ${getColor('white')};
	border-radius: 12px;
	box-shadow: 0 2px 12px 0 ${getColor('gray', 0.25)};
	padding: 60px 0;
`;

export default Brands;
