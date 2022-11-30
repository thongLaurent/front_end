import React from 'react';
import { ReferralsAmount, ReferralsHeader, ReferralsHeaderTitle, ReferralsWrapper } from './referrals.style';

interface ReferralsProps {
    referedPilotsCount: number;
}

const Referrals: React.FC<ReferralsProps> = ({
    referedPilotsCount
}) => {
    return (
        <ReferralsWrapper>
            <ReferralsHeader>
                <ReferralsHeaderTitle>Total Referrals</ReferralsHeaderTitle>
            </ReferralsHeader>
            <ReferralsAmount>{referedPilotsCount}</ReferralsAmount>
        </ReferralsWrapper>
    );
}

export default Referrals;