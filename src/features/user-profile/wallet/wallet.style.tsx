import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const WalletWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background-color: ${themeGet('colors.white', '#ffffff')};
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    padding: 20px;
`;


export const WalletAmount = styled.h2`
  font-size:50px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.regular', '#77798C')};
  display: block;
  margin-bottom: 11px;
`;

export const WalletHeader = styled.div`
    padding: 10px 10px 10px 2px;
`;

export const WalletHeaderTitle = styled.h1`
    font-size: 20px;
`;