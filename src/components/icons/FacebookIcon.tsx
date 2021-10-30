interface IProps {
	onClick?: () => void;
}

const FacebookIcon = (props: IProps) => {
	const { onClick } = props;

	const handleClick = () => {
		onClick && onClick();
	};

	return (
		<span
			className="icon-facebook pointer"
			style={{ fontSize: 37 }}
			onClick={handleClick}
		>
			<span className="path1"></span>
			<span className="path2"></span>
		</span>
	);
};

export default FacebookIcon;
