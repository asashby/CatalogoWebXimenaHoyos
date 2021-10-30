import React, { ReactElement } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useTheme } from 'emotion-theming';

import { Theme } from 'models/Theme';

type Props = {
	color?: string;
	edit?: boolean;
	value: number;
	size?: number;
	onChange?: (value: number) => void;
};

export default ({
	color,
	edit = false,
	value,
	size = 18,
	...props
}: Props): ReactElement => {
	const theme: Theme = useTheme();

	return (
		<ReactStars
			count={5}
			value={value}
			edit={edit}
			size={size}
			activeColor={color || theme.colors.red}
			color={color || theme.colors.red}
			emptyIcon={<i className="icon-star-empty" />}
			filledIcon={<i className="icon-star-filled" />}
			{...props}
		/>
	);
};
