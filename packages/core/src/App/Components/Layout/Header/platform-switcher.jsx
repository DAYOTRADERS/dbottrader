import 'Sass/app/_common/components/platform-switcher.scss';

import { useDevice } from '@deriv-com/ui';
import { Icon } from '@deriv/components';
import { getPlatformInformation } from '@deriv/shared';
import { CSSTransition } from 'react-transition-group';
import { PlatformDropdown } from './platform-dropdown.jsx';
import { PlatformSwitcherLoader } from './Components/Preloader/platform-switcher.jsx';
import { PlatformIconMapper, shouldUseCustomIcon } from './platform-icon-mapper';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const PlatformSwitcher = ({
    toggleDrawer,
    app_routing_history,
    platform_config = [],
    current_language,
    is_landing_company_loaded,
    is_logged_in,
    is_logging_in,
    setTogglePlatformType,
}) => {
    const [is_open, setIsOpen] = React.useState(false);

    const is_close_drawer_fired_ref = React.useRef(false);

    const { isDesktop } = useDevice();

    React.useEffect(() => {
        if (is_close_drawer_fired_ref.current) {
            if (typeof toggleDrawer === 'function') {
                toggleDrawer();
            }
        }
        is_close_drawer_fired_ref.current = false;
    });

    const closeDrawer = () => {
        setIsOpen(false);
        is_close_drawer_fired_ref.current = true;
    };

    return (is_logged_in || is_logging_in ? !is_landing_company_loaded : app_routing_history.length === 0) ? (
        <div
            data-testid='dt_platform_switcher_preloader'
            className={classNames('platform-switcher__preloader', {
                'platform-switcher__preloader--is-mobile': !isDesktop,
            })}
        >
            <PlatformSwitcherLoader is_mobile={!isDesktop} speed={3} />
        </div>
    ) : (
        <React.Fragment>
            <div
                data-testid='dt_platform_switcher'
                className={classNames(
                    'platform-switcher',
                    { 'platform-switcher--active': is_open },
                    { 'platform-switcher--is-mobile': !isDesktop }
                )}
                onClick={() => setIsOpen(!is_open)}
            >
                {(() => {
                    const platform_info = getPlatformInformation(app_routing_history);
                    // When on Deriv Bot, encourage switching by showing 'DERIV TRADER'.
                    // Otherwise, suggest 'DERIV BOT'. For non-custom icons, keep original header/name.
                    const label_text = shouldUseCustomIcon(platform_info.icon)
                        ? platform_info.icon === 'IcRebrandingDerivBot'
                            ? 'DERIV TRADER'
                            : 'DERIV BOT'
                        : platform_info.header || platform_info.name || 'Platform';
                    return (
                        <>
                {shouldUseCustomIcon(getPlatformInformation(app_routing_history).icon) ? (
                    <PlatformIconMapper
                        icon={getPlatformInformation(app_routing_history).icon}
                        width={120}
                        height={25}
                        className='platform-switcher__icon'
                    />
                ) : (
                    <Icon
                        className='platform-switcher__icon'
                        icon={getPlatformInformation(app_routing_history).icon}
                        description={getPlatformInformation(app_routing_history).header}
                        width={120}
                        height={25}
                    />
                )}
                <span className='platform-switcher__label'>{label_text}</span>
                <span className='platform-switcher__arrow-emoji'>👇</span>
                        </>
                    );
                })()}
            </div>
            <CSSTransition
                mountOnEnter
                appear
                in={is_open}
                classNames={{
                    enterDone: 'platform-dropdown--enter-done',
                }}
                timeout={isDesktop && is_open ? 0 : 250}
                unmountOnExit
            >
                <PlatformDropdown
                    platform_config={platform_config}
                    closeDrawer={closeDrawer}
                    current_language={current_language}
                    app_routing_history={app_routing_history}
                    setTogglePlatformType={setTogglePlatformType}
                />
            </CSSTransition>
        </React.Fragment>
    );
};

PlatformSwitcher.propTypes = {
    platform_config: PropTypes.array,
    toggleDrawer: PropTypes.func,
    current_language: PropTypes.string,
    app_routing_history: PropTypes.array,
    is_landing_company_loaded: PropTypes.bool,
    is_logged_in: PropTypes.bool,
    is_logging_in: PropTypes.bool,
    setTogglePlatformType: PropTypes.func,
};

export default withRouter(PlatformSwitcher);
