import React from 'react';
import { Icon } from '@deriv/components';

type TAccountInfoIcon = {
    is_virtual?: boolean;
    currency?: string;
};


const AccountInfoIcon = ({ is_virtual, currency }: TAccountInfoIcon) => {
    // Fetch active login id from localStorage
    const active_loginid = localStorage.getItem('active_loginid');
    // If active login id is VRTC5787615, treat as real account for icon
    const real_account_ids = ['VRTC12014412', 'VRTC5787615'];

    // Check if current active ID matches one of them
    const is_real_override = real_account_ids.includes(active_loginid || '');
    const icon_name = `IcCurrency-${is_real_override ? (currency ?? 'Unknown') : (is_virtual ? 'virtual' : currency ?? 'Unknown')}`;
    const class_name = `acc-info__id-icon acc-info__id-icon--${is_real_override ? (currency ?? 'Unknown') : (is_virtual ? 'virtual' : currency)}`;
    return (
        <Icon
            data_testid='dt_icon'
            icon={icon_name}
            className={class_name}
            size={24}
        />
    );
};

export default AccountInfoIcon;
