import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import MenuIcon from 'components/icons/MenuIcon';
import { getColor } from 'styles/utils';
import { useTheme } from 'emotion-theming';

type Props = {
	handleClick: (status: boolean) => void;
	active: boolean;
};

const SelectCategories = ({ handleClick, active }: Props) => {
	const ref = useRef(null);
	const theme: any = useTheme();

	const handleClickOutside = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			handleClick(false);
		}
	};

	const handleOnClick = () => {
		handleClick(true);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<SelectCategoriesStyled
			className={`flex row pointer ${active ? 'active' : ''}`}
			onClick={handleOnClick}
			ref={ref}
		>
			<MenuIcon
				color={active ? theme.colors.white : theme.colors.green}
			/>
			<span className="text">Categorias</span>
			<span className="arrow-down"></span>
		</SelectCategoriesStyled>
	);
};

const SelectCategoriesStyled = styled.div`
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	width: 160px;

	.text {
		color: ${getColor('green')};
		font-size: 13px;
		transition: 0.25s all linear;
	}

	.arrow-down {
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid ${getColor('green')};
		height: 0;
		transition: 0.25s all linear;
		width: 0;
	}

	&.active {
		background: ${getColor('green')};

		.text {
			color: ${getColor('white')};
		}

		.arrow-down {
			border-top-color: ${getColor('white')};
		}
	}

	&:after {
		content: '';
		background: ${getColor('dark_gray')};
		height: 23px;
		opacity: 0.18;
		margin-right: -13px;
		width: 2px;
	}
`;

export default SelectCategories;
