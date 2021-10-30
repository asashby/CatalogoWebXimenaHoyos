import styled from '@emotion/styled';
import { getColor } from 'styles/utils';

const Promotions = () => {
	return <PromotionsStyled></PromotionsStyled>;
};

const PromotionsStyled = styled.div`
	display: flex;
	background: ${getColor('light_gray')};
	border-radius: 12px;
	justify-content: center;
	width: 100%;
	margin-top: 13px;
	height: 147px;

	.message {
		font-size: 12px;
		line-height: 1.25;
		color: #b5b5b5;
		text-align: center;
		width: 430px;
	}
`;

export default Promotions;
