import { isBot } from '../platform';
import { isStaging } from '../url/helpers';
import { WebSocketUtils } from '@deriv-com/utils';


/*
 * Configuration values needed in js codes
 *
 * NOTE:
 * Please use the following command to avoid accidentally committing personal changes
 * git update-index --assume-unchanged packages/shared/src/utils/config.js
 *
 */

export const livechat_license_id = 12049137;
export const livechat_client_id = '66aa088aad5a414484c1fd1fa8a5ace7';

export const domain_app_ids = {
    'smarttraderstool.com': 70344,
    'deriv.app': 70344,
    'app.deriv.com': 70344,
    'staging-app.deriv.com': 70344,
    'app.deriv.me': 70344,
    'staging-app.deriv.me': 70344,
    'app.deriv.be': 70344,
    'staging-app.deriv.be': 70344,
    'binary.com': 70344,
    'test-app.deriv.com': 70344,
    'royal-app-seven.vercel.app': 70344,
    'star-eight-ruby.vercel.app': 70344,
    'beleiver.vercel.app': 70344,
    'goon-puce.vercel.app': 70344,
};

export const platform_app_ids = {
    derivgo: 70344,
};

export const getCurrentProductionDomain = () =>
    !/^staging\./.test(window.location.hostname) &&
    Object.keys(domain_app_ids).find(domain => window.location.hostname === domain);

export const isProduction = () => {
    const all_domains = Object.keys(domain_app_ids).map(domain => `(www\\.)?${domain.replace('.', '\\.')}`);
    return new RegExp(`^(${all_domains.join('|')})$`, 'i').test(window.location.hostname);
};

export const isTestLink = () => /^((.*)\.binary\.sx)$/i.test(window.location.hostname);
export const isLocal = () => /localhost(:\d+)?$/i.test(window.location.hostname);

/**
 * @deprecated Please use 'WebSocketUtils.getAppId' from '@deriv-com/utils' instead of this.
 */
export const getAppId = () => {
    let app_id = null;
    const user_app_id = '70344';
    const config_app_id = window.localStorage.getItem('config.app_id');
    const current_domain = getCurrentProductionDomain() || '';
    window.localStorage.removeItem('config.platform');
    const platform = window.sessionStorage.getItem('config.platform');
    const is_bot = isBot();

    if (platform && platform_app_ids[platform as keyof typeof platform_app_ids]) {
        app_id = platform_app_ids[platform as keyof typeof platform_app_ids];
    } else if (config_app_id) {
        app_id = config_app_id;
    } else if (user_app_id.length) {
        window.localStorage.setItem('config.default_app_id', user_app_id);
        app_id = user_app_id;
    } else if (isStaging()) {
        window.localStorage.removeItem('config.default_app_id');
        app_id = is_bot ? 70344 : domain_app_ids[current_domain as keyof typeof domain_app_ids] || 70344;
    } else if (/localhost/i.test(window.location.hostname)) {
        app_id = 70344;
    } else {
        window.localStorage.removeItem('config.default_app_id');
        app_id = is_bot ? 70344 : domain_app_ids[current_domain as keyof typeof domain_app_ids] || 70344;
    }

    return app_id;
};

// ✅ UPDATED TO USE CORRECT WEBSOCKET BASE ENDPOINT
export const getSocketURL = () => {
    const local_storage_server_url = window.localStorage.getItem('config.server_url');
    if (local_storage_server_url) return local_storage_server_url;

    // Only return the host, not the full URL
    return 'ws.derivws.com';
};

export const checkAndSetEndpointFromUrl = () => {
    if (isTestLink()) {
        const url_params = new URLSearchParams(location.search.slice(1));

        if (url_params.has('qa_server') && url_params.has('app_id')) {
            const qa_server = url_params.get('qa_server') || '';
            const app_id = url_params.get('app_id') || '';

            url_params.delete('qa_server');
            url_params.delete('app_id');

            // Only set valid WebSocket URL
            if (/^(^(www\.)?qa[0-9]{1,4}\.deriv\.dev|(.*)\.derivws\.com)$/.test(qa_server) && /^[0-9]+$/.test(app_id)) {
                localStorage.setItem('config.app_id', app_id);
                // ✅ ONLY set host, NOT full URL
                localStorage.setItem('config.server_url', `wss://${qa_server}/websockets/v3?app_id=${app_id}`);
            }

            const params = url_params.toString();
            const hash = location.hash;

            location.href = `${location.protocol}//${location.hostname}${location.pathname}${params ? `?${params}` : ''}${hash || ''}`;
            return true;
        }
    }

    return false;
};


export const getDebugServiceWorker = () => {
    const debug_service_worker_flag = window.localStorage.getItem('debug_service_worker');
    if (debug_service_worker_flag) return !!parseInt(debug_service_worker_flag);
    return false;
};