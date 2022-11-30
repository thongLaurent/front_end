import React from 'react';
import { CURRENCY } from 'utils/constant';
import { WalletAmount, WalletHeader, WalletHeaderTitle, WalletWrapper } from './wallet.style';

interface WalletProps {
    walletBalance: number;
}

const Wallet: React.FC<WalletProps> = ({
    walletBalance
}) => {
    return (
        <WalletWrapper>
            <WalletHeader>
                <WalletHeaderTitle>Wallet Balance</WalletHeaderTitle>
            </WalletHeader>
            <WalletAmount>{CURRENCY}{walletBalance}</WalletAmount>
        </WalletWrapper>
    );
}

export default Wallet;