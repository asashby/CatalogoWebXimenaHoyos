import styled from '@emotion/styled';
import { getColor, mq } from 'styles/utils';

export const InputStyled = styled('div')`
	height: auto;
	margin-bottom: 16px;
  	position: relative;
	width: 100%;

	label {
		color: ${getColor('gray')};
		font-size: 12px;
		margin-left: 20px;
		margin-top: 12px;
    position: absolute;
    transition: all 550ms ease;

    &.hint {
      margin-left: 5px;
      margin-top: 0px;
      top: -17px;
    }
	}

	input {
		background: transparent;
		border-radius: 5px;
		border: solid 1px #d8d8d8;
		color: #494949;
		font-size: 14px;
		height: 42px;
		padding-left: 20px;
		transition: all 0.25s linear;
		width: 100%;
		z-index: 999;

		&.invalid {
			border-color: ${getColor('red')};
		}
	}

	.has-error {
		color: ${getColor('red')};
		font-size: 12px;
		height: 16px;
		margin-top: 4px;
		transition: all 0.25s linear;
	}

	${mq.md} {
		margin-bottom: 10px;

		label {
			font-size: 14px;
			margin-bottom: 8px;
		}
	}
`;
