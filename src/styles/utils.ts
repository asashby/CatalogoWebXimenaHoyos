import linearGradient from 'polished/lib/mixins/linearGradient';
import mergeLeft from 'ramda/src/mergeLeft';
import parseToRgb from 'polished/lib/color/parseToRgb';
import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';
import rgba from 'polished/lib/color/rgba';
import theme, { breakpoints } from 'theme/theme';

export const getColor = (color, alpha = 1) =>
	pipe(
		path(['theme', 'colors', color]),
		parseToRgb,
		mergeLeft({ alpha }),
		rgba
	);

export const getBlackGradient = (toDirection = 'to bottom') => {
	const mockProps = { theme };

	return linearGradient({
		colorStops: [
			`${getColor('black', 0.24)(mockProps)} 30%`,
			`${getColor('black', 0.45)(mockProps)} 70%`
		],
		toDirection,
		fallback: 'transparent'
	});
};

type MediaQueries = {
	[key: string]: string;
};

export const mq: MediaQueries = ['sm', 'md', 'lg', 'xl', 'xxl'].reduce(
	(acc, cur, index) => {
		acc[cur] = `@media (min-width: ${breakpoints[index]})`;
		return acc;
	},
	{}
);
