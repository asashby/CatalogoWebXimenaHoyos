import { ReactElement } from 'react';

import { CartModalStyled, CartModalContentStyled } from './CartModal.styles';

import { SummaryCartForm } from 'components/Cart';

import { CommerceData } from 'models/Commerce';

type CartModalProps = {
	closeCartModal: () => void;
	commerceData: CommerceData;
	banks: any[];
};

export const CartModal = ({ closeCartModal, commerceData, banks}: CartModalProps): ReactElement => (
	<CartModalStyled>
		<CartModalContentStyled>
			<SummaryCartForm 
				close={closeCartModal} 
				commerceData={commerceData}
				banks={banks}
			/>
		</CartModalContentStyled>
	</CartModalStyled>
);
