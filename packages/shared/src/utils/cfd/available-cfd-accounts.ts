import { localize } from '@deriv/translations';

import { CFD_PLATFORMS } from '../platform';

export interface AvailableAccount {
    name: string;
    description?: string;
    is_visible?: boolean;
    is_disabled?: boolean;
    platform?: string;
    market_type?: 'all' | 'financial' | 'synthetic';
    icon: string;
    availability: string;
    link_to?: string;
}

export const getCFDAvailableAccount = () => [
    
];
