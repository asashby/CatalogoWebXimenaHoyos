import { useEffect, useState } from 'react';

export const useViewport = () => {
	const [height, setHeight] = useState<number>(0);
	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
		const handleWindowResize = (): void => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		};

		handleWindowResize();

		window.addEventListener('resize', handleWindowResize);

		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	return { height, width };
};
