import styled from '@emotion/styled';

interface IProps {
	onClick?: () => void;
}

const YoutubeStyled = styled('span')`
	background-color: #e93f33;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	color: white;
	font-size: 37px;
`;

const YoutubeIcon = (props: IProps) => {
	const { onClick } = props;

	const handleClick = () => {
		onClick && onClick();
	};

	return (
		<YoutubeStyled
			className="icon-youtube pointer"
			onClick={handleClick}
		></YoutubeStyled>
	);
};

export default YoutubeIcon;
