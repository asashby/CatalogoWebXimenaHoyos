import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

interface IProps {
	items: string[];
	title?: string;
	textStyle?: { [key: string]: any };
	style?: Object;
	onChange?: (value: any) => void;
	className?: string;
}

const Select = ({
	style = {},
	title = '',
	textStyle = {},
	items,
	onChange,
	className = ''
}: IProps) => {
	const ref = useRef(null);
	const [value, setValue] = useState(items[0]);
	const [showList, setShowLit] = useState<boolean>(false);

	const handleListDisplay = () => {
		setShowLit((current) => !current);
	};

	const handleClickOutside = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			setShowLit(false);
		}
	};

	const handleOptionClick = (e) => {
		const name = e.target.getAttribute('data-name');

		setValue(name);
		setShowLit(false);

		if (typeof onChange === 'function') {
			onChange(name);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<SelectStyled style={style} ref={ref} className={className}>
			<div
				className="selected-text center pointer"
				onClick={handleListDisplay}
			>
				<span className="text" style={textStyle}>
					{title.replace('?', value)}
				</span>
				<span
					className="arrow-down"
					style={{ borderTopColor: textStyle.color }}
				></span>
			</div>
			{showList && (
				<ul className="select-options">
					{items.map((item: string, index: number) => (
						<li
							className="select-option pointer"
							data-name={item}
							key={`Select-item-${item}-${index}`}
							onClick={handleOptionClick}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</SelectStyled>
	);
};

const SelectStyled = styled.div`
	position: relative;
	width: 190px;
	border-radius: 19px;
	border: 1px solid ${(props: any) => props.theme.colors.white};
	height: 100%;

	.selected-text {
		height: 100%;
		justify-content: space-between;
		padding: 0 10px;

		.text {
			color: ${(props: any) => props.theme.colors.white};
			font-size: 12px;
			margin-right: 3px;
		}

		.arrow-down {
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-top: 5px solid ${(props: any) => props.theme.colors.white};
			height: 0;
			margin-top: 2px;
			width: 0;
		}
	}

	.select-options {
		background: ${(props: any) => props.theme.colors.white};
		box-shadow: 0 2px 12px 0 rgba(230, 230, 230, 0.5);
		position: absolute;
		top: calc(100% + 6px);
		width: 100%;
		z-index: 10;

		.select-option {
			background: ${(props: any) => props.theme.colors.white};
			color: #909090;
			font-size: 11px;
			list-style-type: none;
			padding: 13px;
			text-align: center;
			margin-top: 2px;

			&:hover {
				background: #f6f6f6;
			}
		}
	}
`;

export default Select;
