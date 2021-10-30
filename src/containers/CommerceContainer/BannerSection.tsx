import FacebookLive from 'components/FacebookLive';
import styled from '@emotion/styled';
import {
	Banners,
	CommerceData,
	FacebookLive as FacebookLiveModel
} from 'models/Commerce';
import { Flex, Box } from 'reflexbox';
import CommerceInfo from './CommerceInfo';
import { SingleCarousel, MultiProductsCarousel } from 'components/Carousel';
import { Promotion } from 'models/Promotion';
import { useMemo } from 'react';

type Props = {
	banners: Banners;
	commerceInfo: CommerceData;
	fbLive: FacebookLiveModel;
	promotions: Promotion[];
};

const BannerSection = (props: Props) => {
	const { commerceInfo, fbLive, promotions, banners = {} } = props;
	// const { status, link } = fbLive;
	const status = '';
	const link = '';

	const showFBLive = status && link;

	const bannerItems = useMemo(() => {
		const list = [];

		Object.keys(banners).map((key) => {
			list.push(banners[key]);
		});

		return list;
	}, [banners]);

	return (
		<BannerSectionStyled className="container flex column">
			<Box>
				<Flex
					flexDirection={{ _: 'column', md: 'row' }}
					justifyContent="space-between"
					alignItems="stretch"
				>
					<Box
						alignItems="center"
						display="flex"
						width={{ _: 1, md: 1 / 2, lg: 2 / 3 }}
					>
						{showFBLive ? (
							<Box
								width={{ _: 1, lg: 3 / 4 }}
								maxHeight={360}
								m="auto"
							>
								<FacebookLive link={link} />
							</Box>
						) : (
							<Box
								width={{ _: 1 }}
								maxWidth={697}
								height={217}
								m="auto"
							>
								<SingleCarousel items={bannerItems} />
							</Box>
						)}
					</Box>
					<Box
						width={{ _: 1, md: 1 / 2, lg: 1 / 3 }}
						height={'auto'}
						pr={{ _: 0, md: 20 }}
						pl={{ _: 0, md: 20 }}
					>
						<CommerceInfo data={commerceInfo} />
					</Box>
				</Flex>
				{promotions ? (
					<Flex
						alignItems="center"
						justifyContent="space-between"
						mt={3}
					>
						<span className="promotions-title bold">
							Promociones en tiempo real
						</span>
						<div className="bar"></div>
					</Flex>
				) : null}
				<Flex>
					<Box width={{ _: 1 }}>
						<MultiProductsCarousel items={[]} />
					</Box>
				</Flex>
			</Box>
		</BannerSectionStyled>
	);
};

const BannerSectionStyled = styled.section`
	background: ${(props: any) => props.theme.colors.white};
	width: 100%;
	padding: 16px 16px;

	.slider {
		width: 65%;
		background: black;
		height: 217px;
	}

	.promotions-title {
		color: ${(props: any) => props.theme.colors.black};
		font-size: 20px;
		font-weight: bold;
		width: 250px;
	}

	.bar {
		flex: 1;
		height: 2px;
		background: #eee;
	}
`;

export default BannerSection;
