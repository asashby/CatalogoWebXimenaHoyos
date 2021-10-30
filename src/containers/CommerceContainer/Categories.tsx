import Select from 'components/Select';
import styled from '@emotion/styled';
import { Flex, Box } from 'reflexbox';
import {
	ORDER_BY_DISCOUNT,
	ORDER_BY_HIGHER_PRICE,
	ORDER_BY_LOWER_PRICE,
	SHOW_ALL,
	SHOW_BY_CATEGORY
} from 'Constants';

type Props = {
	total: number;
	handleChangeOrderBy: (value: string) => void;
	handleChangeShowBy: (value: string) => void;
	isMobile: boolean;
};

const Categories = (props: Props) => {
	const { total, handleChangeOrderBy, handleChangeShowBy, isMobile } = props;
	const selectStyle = {
		border: 'solid 1px #2abca4',
		borderRadius: 19,
		height: 38,
		width: isMobile ? '100%' : 200
	};

	const selectTextStyle = {
		color: '#2abca4',
		fontSize: 12
	};

	return (
		<CategoriesStyled>
			<Flex
				width="100%"
				justifyContent="space-between"
				alignItems="center"
				flexDirection={ props.isMobile ? 'column' : 'row'}
			>
				<Box>
					<Flex>
						<Box mr={13} width={ props.isMobile ? 240 : 1}>
							<Select
								style={selectStyle}
								textStyle={selectTextStyle}
								items={[SHOW_ALL, SHOW_BY_CATEGORY]}
								title={'Ver:  ?'}
								onChange={handleChangeShowBy}
							/>
						</Box>
						<Box width={1}>
							<Select
								style={selectStyle}
								textStyle={selectTextStyle}
								items={[
									ORDER_BY_DISCOUNT,
									ORDER_BY_LOWER_PRICE,
									ORDER_BY_HIGHER_PRICE
								]}
								title={'Ordenar por: ?'}
								onChange={handleChangeOrderBy}
							/>
						</Box>
					</Flex>
				</Box>
				<Box mr={props.isMobile ? 0 : 2} mt={props.isMobile ? 2 : 0}>
					<span className="tatal-found">
						{total} {total === 1 ? 'resultado' : 'resultados'}
					</span>
				</Box>
			</Flex>
		</CategoriesStyled>
	);
};

const CategoriesStyled = styled.div`
	border-radius: 12px;
	background: ${(props: any) => props.theme.colors.white};
	box-shadow: 0 2px 12px 0 rgba(230, 230, 230, 0.5);
	display: flex;
	align-items: center;
	height: 58px;
	margin: 13px 0;
	padding: 5px 16px;

	.tatal-found {
		color: ${(props: any) => props.theme.colors.black};
		font-size: 12px;
	}

	@media screen and (max-width: 1022px) {
		height: 80px;
	}
`;

export default Categories;
