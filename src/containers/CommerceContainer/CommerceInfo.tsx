import styled from '@emotion/styled';
import { Flex, Box } from 'reflexbox';
import WhatsappIcon from 'components/icons/WhatsappIcon';
import FacebookIcon from 'components/icons/FacebookIcon';
import InstagramIcon from 'components/icons/InstagramIcon';
import YoutubeIcon from 'components/icons/YoutubeIcon';
import { CommerceData } from 'models/Commerce';
import CommerceDataComponent from 'components/CommerceData/CommerceData.component';
import { mq } from 'styles/utils';
import { useEffect, useState } from 'react';

type Props = {
	data: CommerceData;
};

const CommerceInfo = ({ data }: Props) => {
	const [wspLink, setWspLink] = useState<string>('');
	const { phone, socialNetworks } = data;

	useEffect(() => {
		let link;

		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			link = `https://wa.me/${phone}`;
		} else {
			link = `https://web.whatsapp.com/send?phone=${phone}`;
		}

		setWspLink(link);
	}, []);

	const getRRSS = (code: string) => {
		const parsedCode = code.toLowerCase();
		const rrssOptions = {
			facebook: <FacebookIcon />,
			instagram: <InstagramIcon />,
			youtube: <YoutubeIcon />
		}
		return rrssOptions[parsedCode];
	}

	return (
		<CommerceInfoStyled className="flex row">
			<div className="flex column">
				<CommerceDataComponent data={data} />
				<a
					className="whatsapp"
					href={wspLink}
					target="_blank"
					rel="noopener noreferrer"
				>
					<WhatsappIcon/>
					<span className="number semi-bold mr-1 ml-1">{phone}</span>
				</a>
				{/* <Flex className="realtime-info" justifyContent="space-between">
					<Box className="item center">
						<span className="icon-sold"></span>
						<span className="value bold">20</span>
						<span className="label">Pedidos realizados</span>
					</Box>
					<Box className="item center">
						<span className="icon-sale"></span>
						<span className="value bold">10</span>
						<span className="label">Promociones</span>
					</Box>
				</Flex> */}
				<div className="social">
					<div className="items">
						{socialNetworks.map((social) => (
							<a
								key={`CommerceInfo-social-item-${social.code}`}
								href={social.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								{getRRSS(social.code)}
							</a>
						))}
					</div>
				</div>
			</div>
		</CommerceInfoStyled>
	);
};

const CommerceInfoStyled = styled.div`
	box-sizing: border-box;
	position: relative;
	justify-content: center;
	width: 100%;
	padding: 12px;
	height: 100%;

	.flex.column {
		justify-content: space-around;
	}

	.social {
		.items {
			display: flex;
			justify-content: center;

			a {
				margin: 0 8px;
			}
		}
	}

	.title {
		color: ${(props: any) => props.theme.colors.black};
		font-size: 12px;
		text-transform: uppercase;
		margin-bottom: 13px;
	}

	.whatsapp {
		align-items: center;
		background-color: #45c354;
		border-radius: 5px;
		color: ${(props: any) => props.theme.colors.white};
		height: 32px;
		display: flex;
		justify-content: center;
		margin-bottom: 9px;
		padding: 7px;
		width: 100%;

		.label {
			font-size: 10px;
			line-height: 1.25;
		}
	}

	.realtime-info {
		margin-bottom: 20px;
		max-width: 224px;
		width: 90%;

		.item {
			flex-direction: column;
			justify-content: space-around;
			width: 106px;
			height: 87px;
			border-radius: 5px;
			border: solid 1px #f3f3f3;
			padding: 5px 12px;

			[class^='icon-'] {
				font-size: 20px;
				color: ${(props: any) => props.theme.colors.red};
			}
		}

		.label {
			color: ${(props: any) => props.theme.colors.black};
			font-size: 10px;
			text-align: center;
			width: 70px;
		}

		.value {
			color: ${(props: any) => props.theme.colors.red};
			font-size: 18px;
		}
	}

	${mq.md} {
		.social {
			position: absolute;
			top: 10%;
			right: -44px;

			.items {
				height: 80px;
				flex-direction: column;
			}
		}
	}
`;

export default CommerceInfo;
