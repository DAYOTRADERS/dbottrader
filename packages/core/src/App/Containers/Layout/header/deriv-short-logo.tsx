import React from 'react';
import { StaticUrl } from '@deriv/components';
import LOGO from '../../../Logo/NILOTE.png'; // Correct relative path

const DerivShortLogo = () => {
    return (
        <div className='header__menu-left-logo'>
           
                <img
                    src={LOGO}
                    alt='Deriv Short Logo'
                    style={{ height: '35px', width: 'auto' }}
                />
            
        </div>
    );
};

export default DerivShortLogo;

