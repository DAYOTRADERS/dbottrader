import LZString from 'lz-string';
import localForage from 'localforage';
import DBotStore from '../scratch/dbot-store';
import { save_types } from '../constants/save-type';
import AutoRobot from './bots/BRAMEVENODDPRINTER.xml';
import OverUnderBot from './bots/Derivwizard.xml';
import Derivminer from './bots/$hmspeedbot$.xml';
import Derivflipper from './bots/Mrdukeov2bot.xml';
import Printer from './bots/BRAMSPEEDBOT.xml';
import Under8 from './bots/DoubleOverWithanalysis.xml';
import Dodo from './bots/Aiunder8-7-6-5recoveryunder3-4-5adjustable.xml';
import Pepe from './bots/PROFITGAINERXVTscunentrypointbeforrun.xml';
import Kuku from './bots/PROFITGAINERXVT.xml';

// Ensure Blockly is available globally
const getBlockly = () => {
    if (typeof window !== 'undefined' && window.Blockly) {
        return window.Blockly;
    }
    throw new Error('Blockly not available - workspace not initialized');
};

// Static bot configurations
const STATIC_BOTS = {
    auto_robot: {
        id: 'auto_robot',
        name: 'BRAM EVEN ODD PRINTER',
        xml: AutoRobot,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    over_under: {
        id: 'over_under_bot_by_GLE',
        name: 'Deriv wizard',
        xml: OverUnderBot,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    deriv_miner_pro: {
        id: 'deriv_miner_pro',
        name: 'ENHANCED Digit Switcher VERSION 5',
        xml: Derivminer,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    dollar_flipper: {
        id: 'dollar_flipper',
        name: 'master G8 OVER UNDER BY STATE FX VERSION 1 2026.',
        xml: Derivflipper,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    printer: {
        id: 'printer',
        name: 'Over Destroyer by state fx',
        xml: Printer,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    under8: {
        id: 'under8',
        name: 'STATES Digit Switcher V2',
        xml: Under8,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    dodo: {
        id: 'dodo',
        name: 'Aiunder8-7-6-5recoveryunder3-4-5adjustable',
        xml: Dodo,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    pepe: {
        id: 'pepe',
        name: 'PROFIT GAINER XVT',
        xml: Pepe,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    kuku: {
        id: 'kuku',
        name: 'PROFIT GAINER XVT',
        xml: Kuku,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
};

const getStaticBots = () => Object.values(STATIC_BOTS);

/**
 * 🔒 Disable saving bots
 */
export const saveWorkspaceToRecent = async () => {
    console.warn('[INFO] Saving disabled → Using static bots only.');
    const {
        load_modal: { updateListStrategies },
    } = DBotStore.instance;
    updateListStrategies(getStaticBots());
};

/**
 * ✅ Always return static bots
 */
export const getSavedWorkspaces = async () => {
    const bots = getStaticBots();
    console.log(
        '[DEBUG] Available static bots:',
        bots.map(bot => bot.id)
    );
    return bots;
};

/**
 * Load a bot by ID (from static list only)
 */
export const loadStrategy = async strategy_id => {
    console.log(`[DEBUG] Attempting to load bot: ${strategy_id}`);

    // Check for duplicate IDs
    const staticBots = getStaticBots();
    const duplicateIds = staticBots.filter((bot, index) => staticBots.findIndex(b => b.id === bot.id) !== index);

    if (duplicateIds.length > 0) {
        console.error(
            '[ERROR] Duplicate bot IDs found:',
            duplicateIds.map(b => b.id)
        );
    }

    const strategy = staticBots.find(bot => bot.id === strategy_id);

    if (!strategy) {
        console.error(
            `[ERROR] Bot with id "${strategy_id}" not found. Available bots:`,
            staticBots.map(b => b.id)
        );
        return false;
    }

    try {
        // Get Blockly instance
        const Blockly = getBlockly();
        
        // Check if workspace is initialized
        if (!Blockly.derivWorkspace) {
            console.error('[ERROR] Blockly workspace not initialized');
            return false;
        }

        // Clear existing workspace first
        console.log('[DEBUG] Clearing existing workspace');
        Blockly.derivWorkspace.clear();

        const parser = new DOMParser();
        const xmlDom = parser.parseFromString(strategy.xml, 'text/xml').documentElement;

        // Check if XML is valid
        if (xmlDom.querySelector('parsererror')) {
            console.error('[ERROR] Invalid XML content for bot:', strategy_id);
            return false;
        }

        const convertedXml = convertStrategyToIsDbot(xmlDom);

        Blockly.Xml.domToWorkspace(convertedXml, Blockly.derivWorkspace);
        Blockly.derivWorkspace.current_strategy_id = strategy_id;

        console.log(`[SUCCESS] Loaded static bot: ${strategy.name} (ID: ${strategy_id})`);
        return true;
    } catch (error) {
        console.error('Error loading static bot:', error);
        return false;
    }
};

/**
 * 🔒 Disable removing bots
 */
export const removeExistingWorkspace = async () => {
    console.warn('[INFO] Remove disabled → Static bots only.');
    return false;
};

/**
 * Ensure xml has `is_dbot` flag
 */
export const convertStrategyToIsDbot = xml_dom => {
    if (!xml_dom) return;
    xml_dom.setAttribute('is_dbot', 'true');
    return xml_dom;
};

// 🧹 Clear storage & recents at startup
localStorage.removeItem('saved_workspaces');
localStorage.removeItem('recent_strategies');
console.log('[INFO] Cleared saved/recent bots → Static bots only.');

// 🧪 Test function to verify all bots can be parsed
export const testAllBots = () => {
    const staticBots = getStaticBots();
    console.log('[TEST] Testing all bot XML files...');
    
    staticBots.forEach(bot => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(bot.xml, 'text/xml');
            const hasErrors = doc.getElementsByTagName('parsererror').length > 0;
            
            if (hasErrors) {
                console.error(`[TEST FAIL] ${bot.id}: XML parsing error`);
                console.error(`[TEST FAIL] XML preview:`, bot.xml.substring(0, 300) + '...');
            } else {
                console.log(`[TEST PASS] ${bot.id}: XML is valid (${bot.xml.length} chars)`);
            }
        } catch (e) {
            console.error(`[TEST FAIL] ${bot.id}: Exception during parsing:`, e.message);
        }
    });
};

// Run test on load
setTimeout(testAllBots, 1000);
