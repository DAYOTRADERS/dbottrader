import React from 'react';
import { useDevice } from '@deriv-com/ui';
import { Text } from '@deriv/components';
import { Localize } from '@deriv/translations';
import './cfds-title.scss';

const CFDsTitle = () => {
    const { isDesktop } = useDevice();

    if (!isDesktop) return null;
    return (
        <div className='cfds-title'>
            
        </div>
    );
};

export default CFDsTitle;
