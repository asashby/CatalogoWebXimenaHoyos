import Link from 'next/link';
import styled from '@emotion/styled';
import { getColor } from 'styles/utils';

interface Temporal {
	name: string;
	slug: string;
	logo: string;
}

type Props = {
	mypes: Temporal[];
	title: string;
};

const MypesSlider = (props: Props) => (
	<MypesSliderStyled className="container">
		<div className="header flex row">
			<h3 className="title bold upper">{props.title}</h3>
			<div className="bar"></div>
		</div>
		<div className="mypes flex row">
			{props.mypes.map((mype, index: number) => (
				<Link
					key={`MypesSlider-${props.title}-${mype.name}-${index}`}
					href="/tienda/[commerceSlug]"
					as={`/tienda/${mype.slug}`}
				>
					<picture>
						<img
							className="pointer"
							alt={mype.name}
							src={mype.logo}
						/>
					</picture>
				</Link>
			))}
		</div>
	</MypesSliderStyled>
);

const MypesSliderStyled = styled('section')`
	background: ${getColor('white')};
	flex-direction: column;
	margin-bottom: 13px;
	padding: 23px 22px;

	.header {
		height: 30px;
		align-items: center;
		margin: 12px 0;
		width: 100%;

		.title {
			color: ${getColor('black')};
			font-size: 14px;
			margin-right: 20px;
		}

		.bar {
			flex: 1;
			height: 2px;
			background: #eee;
		}
	}

	.mypes {
		height: 80px;
		overflow-x: auto;
		margin: 5px 0;
		width: 100%;

		picture {
			display: inline-block;
			margin: 0px 15px;
			overflow: hidden;
			min-width: 155px;

			img {
				height: 100%;
				object-fit: contain;
				width: 100%;
			}
		}
	}
`;

export default MypesSlider;
