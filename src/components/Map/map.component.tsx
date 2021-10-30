import { ReactElement } from 'react';
import GoogleMapReact from 'google-map-react';
import getConfig from 'next/config';

import styled from '@emotion/styled';

const { publicRuntimeConfig } = getConfig();
const { applicationConfig } = publicRuntimeConfig;

export const LocationPin = () => (
	<LocationPinStyle>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="30"
			viewBox="0 0 24 24"
			width="30"
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path
				fill="red"
				d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
		</svg>
	</LocationPinStyle>
);

type MapProps = {
	address?: string;
	center: {
		lat: number;
		lng: number;
	};
	isLoading: boolean;
	onGoogleApiLoaded: (map: any, maps: any) => void;
	zoom: number;
};

export const SimpleMap = ({ ...props }: MapProps): ReactElement => {
	const { center, zoom, address, isLoading, onGoogleApiLoaded } = props;

	return (
		<MapContainerStyle>
			{ isLoading ?
				<GrayRectangleStyle />
				: <MapContainerStyle>
					<GoogleMapReact
						bootstrapURLKeys={{
							key: applicationConfig.googleMapKey,
							language: 'es',
							libraries: ['places']
						}}
						center={center}
						zoom={zoom}
						onGoogleApiLoaded={onGoogleApiLoaded}
						yesIWantToUseGoogleMapApiInternals
					>
					</GoogleMapReact>
				</MapContainerStyle>
			}
		</MapContainerStyle>
	);
};

const LocationPinStyle = styled('div')`
	height: 24px;
	transform: translate(-15px, -15px);
	width: 24px;
`;

const GrayRectangleStyle = styled('div')`
	background-color: gray;
`;

const MapContainerStyle = styled('div')`
	height: 200px;
	margin-bottom: 20px;
	margin-top: 15px;
	width: 100%;
`;
