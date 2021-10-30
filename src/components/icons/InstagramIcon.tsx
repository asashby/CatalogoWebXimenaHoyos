interface IProps {
	onClick?: () => void;
}

const InstagramIcon = (props: IProps) => {
	const { onClick } = props;

	const handleClick = () => {
		onClick && onClick();
	};

	return (
		<span
			className="icon-instagram pointer"
			style={{ fontSize: 37 }}
			onClick={handleClick}
		>
			<img
				src="/images/instagram.png"
				srcSet="/images/instagram@2x.png 2x, /images/instagram@3x.png 3x"
				alt="instagram"
			/>
		</span>
	);
};

export default InstagramIcon;
