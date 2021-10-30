import Sticky from 'components/Sticky';
import { useViewport } from 'hooks/useViewport';
import { ReactElement } from 'react';
import ReactPlayer from 'react-player';

type Props = {
	link: string;
};

const FacebookLive = (props: Props): ReactElement => {
	const { width } = useViewport();

	return (
		<Sticky bottom={true} disabled={true}>
			<div
				className="player-wrapper"
				style={{ right: width < 1520 ? 8 : (width - 1520) / 2 + 8 }}
			>
				<ReactPlayer
					url={props.link}
					className="react-player"
					playing={true}
					width="auto"
					height="100%"
				/>
			</div>
		</Sticky>
	);
};

export default FacebookLive;
