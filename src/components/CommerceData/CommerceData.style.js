import styled from '@emotion/styled';
import { mq } from 'styles/utils';

export const CommerceDataStyled = styled('div')`
    font-size: 12px;
    margin-top: 35px;

    .commerce-data-flex {
        align-items: start;
        display: flex;
        flex-wrap: wrap;
    }

    .commdata-item {
        color: #767676;
        line-height: normal;
        margin-bottom: 10px;

        label {
            color: #494949;
        }

        h4 {
        }
    }

    .short {
        flex-basis: 30%;
        margin-right: 15px;
    }

    .long {
        flex: 1 1 62%;
    }

    ${mq.md} {
        margin-top: 0px; 
    }
`;