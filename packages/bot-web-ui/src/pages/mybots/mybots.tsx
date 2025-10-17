import React from 'react';
import { getSavedWorkspaces } from '@deriv/bot-skeleton';
import { Text, Icon } from '@deriv/components';
import { observer, useStore } from '@deriv/stores';
import { Localize, localize } from '@deriv/translations';
import { useDBotStore } from 'Stores/useDBotStore';
import DeleteDialog from '../dashboard/bot-list/delete-dialog';
import RecentWorkspace from '../dashboard/bot-list/recent-workspace';
import './mybots.scss';

const DashboardBotList = observer(() => {
    const { load_modal, dashboard } = useDBotStore();
    const { setDashboardStrategies, dashboard_strategies } = load_modal;
    const { setStrategySaveType, strategy_save_type } = dashboard;
    const { ui } = useStore();
    const { is_desktop } = ui;
    const get_first_strategy_info = React.useRef(false);
    const get_instacee = React.useRef(false);

    React.useEffect(() => {
        setStrategySaveType('');
        const getStrategies = async () => {
            const recent_strategies = await getSavedWorkspaces();
            setDashboardStrategies(recent_strategies);
            if (!get_instacee.current) {
                get_instacee.current = true;
            }
        };
        getStrategies();
    }, [strategy_save_type]);

    React.useEffect(() => {
        if (!dashboard_strategies?.length && !get_first_strategy_info.current) {
            get_first_strategy_info.current = true;
        }
    }, []);

    if (!dashboard_strategies?.length) return null;

    return (
        <div className='bot-dashboard'>
            <div className='bot-dashboard__header'>
                <Text size={is_desktop ? 'm' : 's'} weight='bold' color='prominent'>
                    <Localize i18n_default_text='Your Trading Bots' />
                </Text>
                <Text size={is_desktop ? 's' : 'xs'} color='less-prominent'>
                    <Localize i18n_default_text='Manage and launch your automated trading strategies' />
                </Text>
            </div>

            <div className='bot-dashboard__grid'>
                {dashboard_strategies.map(workspace => (
                    <div className='bot-card' key={workspace.id}>
                        <div className='bot-card__header'>
                            <Icon icon='IcRobot' size={24} className='bot-card__icon' />
                            <Text size='s' weight='bold' className='bot-card__title'>
                                {workspace.name || localize('Untitled Bot')}
                            </Text>
                        </div>
                        <div className='bot-card__details'>
                            <div className='bot-card__detail'>
                                <Icon icon='IcCalendar' size={12} />
                                <Text size='xs' className='bot-card__detail-text'>
                                    {new Date(workspace.timestamp).toLocaleDateString()}
                                </Text>
                            </div>
                            <div className='bot-card__detail'>
                                <Icon icon='IcClock' size={12} />
                                <Text size='xs' className='bot-card__detail-text'>
                                    {new Date(workspace.timestamp).toLocaleTimeString()}
                                </Text>
                            </div>
                            <div className='bot-card__detail'>
                                <Icon icon='IcCloudUpload' size={12} />
                                <Text size='xs' className='bot-card__detail-text'>
                                    {workspace.save_type}
                                </Text>
                            </div>
                        </div>
                        <div className='bot-card__actions'>
                            <RecentWorkspace workspace={workspace} />
                        </div>
                    </div>
                ))}
            </div>
            <DeleteDialog />
        </div>
    );
});

export default DashboardBotList;