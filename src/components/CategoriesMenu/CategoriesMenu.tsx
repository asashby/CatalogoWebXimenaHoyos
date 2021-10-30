import Link from 'next/link';
import { ReactElement } from 'react';

import styled from '@emotion/styled';
import { CATEGORY_ITEMS } from 'Constants';

import {
	MobileWrapperModal,
	MobileContentModal,
	MobileHeaderModal
} from 'components/Common';
import { useRouter } from 'next/router';

type Props = {
	show: boolean;
	close: () => void;
};

export const CategoriesMenu = ({
	show = false,
	close
}: Props): ReactElement => {
	const { replace } = useRouter();
	const handleClose = () => {
		close();
	};

	const handleClick = (evt) => {
		const categorySlug = evt.target.getAttribute('data-href');
		replace(`/categoria/${categorySlug}`);
		handleClose();
	};

	return (
		<MobileWrapperModal className={`${show ? 'show' : ''}`}>
			<MobileContentModal>
				<MobileHeaderModal className="flex bold">
					<i className="icon-arrow mr-1" onClick={handleClose} />
					Categorías
				</MobileHeaderModal>
				<NavigationList>
					{CATEGORY_ITEMS.map((item) => (
						<NavigationItem
							className="menu-item flex row pointer medium"
							key={`NavigationList-item-${item.name}`}
						>
							<a onClick={handleClick} data-href={item.slug}>
								<i className={`icon-${item.icon}`} />
								{item.name}
							</a>
						</NavigationItem>
					))}
				</NavigationList>
			</MobileContentModal>
		</MobileWrapperModal>
	);
};

const NavigationList = styled('ul')`
	padding: 13px 0;
	list-style: none;
	position: relative;
`;

const NavigationItem = styled('li')`
	align-items: center;
	color: #909090;
	height: 46px;
	line-height: 28px;
	margin-bottom: 7px;
	position: relative;
	transition: all 0.25s linear;

	a {
		align-items: center;
		color: #909090;
		display: flex;
		font-size: 13px;
		padding-left: 30px;
		width: 100%;
	}

	i[class^='icon-'] {
		color: #909090;
		font-size: 18px;
		margin-right: 6px;
		text-align: center;
		width: 25px;
	}

	i.icon-automotriz {
		font-size: 10px;
	}

	&:before {
		background: transparent;
		box-sizing: content-box;
		content: '';
		height: 100%;
		left: 0;
		position: absolute;
		transition: 0.2s all linear;
		width: 18px;
	}
`;
