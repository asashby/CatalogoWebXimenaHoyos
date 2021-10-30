import { useViewport } from 'hooks/useViewport';
import { Fragment, useState, useRef, useEffect, ReactChild } from 'react';

type Props = {
	children: ReactChild;
	height?: number;
	style?: Object;
	top?: number;
	bottom?: boolean;
	disabled?: boolean;
};

const Sticky = ({
	bottom,
	children,
	disabled = false,
	height,
	top = 0,
	...props
}: Props) => {
	const { width } = useViewport();
	const [isSticky, setSticky] = useState<boolean>(false);
	const ref = useRef(null);
	const noStickyOnMobile = disabled && width < 1024;

	const handleScroll = () => {
		if (ref.current) {
			setSticky(ref.current.getBoundingClientRect().top <= top);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div
			className={`sticky-wrapper ${
				isSticky && !noStickyOnMobile ? 'sticky' : ''
			} ${bottom ? 'moveToBottom' : ''}`}
			style={{ height, ...props.style }}
			ref={ref}
		>
			{children}
		</div>
	);
};

export default Sticky;
