import React from 'react';
import classNames from 'classnames';
import { Text } from '@deriv/components';
import { TCompareAccountsCard } from 'Components/props.types';

const CFDCompareAccountsPlatformLabel = ({ trading_platforms }: TCompareAccountsCard) => {
   

    return (
        <div className='compare-cfd-account-platform-label'>
            <Text as='p' weight='bold' size='xxxs' align='center' >
               
            </Text>
        </div>
    );
};

export default CFDCompareAccountsPlatformLabel;
