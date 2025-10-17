export const historyToTicks = history => {
    console.log('[historyToTicks] history:', history);
    const result = history.times.map((t, idx) => ({
        epoch: +t,
        quote: +history.prices[idx],
    }));
    console.log('[historyToTicks] result:', result);
    return result;
};

export const getLast = arr => {
    console.log('[getLast] arr:', arr);
    const last = arr && (arr.length === 0 ? undefined : arr[arr.length - 1]);
    console.log('[getLast] last:', last);
    return last;
};

export const parseTick = tick => {
    console.log('[parseTick] tick:', tick);
    const parsed = {
        epoch: +tick.epoch,
        quote: +tick.quote,
    };
    console.log('[parseTick] parsed:', parsed);
    return parsed;
};

export const parseOhlc = ohlc => {
    console.log('[parseOhlc] ohlc:', ohlc);
    const parsed = {
        open: +ohlc.open,
        high: +ohlc.high,
        low: +ohlc.low,
        close: +ohlc.close,
        epoch: +(ohlc.open_time || ohlc.epoch),
    };
    console.log('[parseOhlc] parsed:', parsed);
    return parsed;
};

export const parseCandles = candles => {
    console.log('[parseCandles] candles:', candles);
    const result = candles.map(t => parseOhlc(t));
    console.log('[parseCandles] result:', result);
    return result;
};

export const updateTicks = (ticks, newTick) => {
    console.log('[updateTicks] ticks:', ticks, 'newTick:', newTick);
    const safeTicks = Array.isArray(ticks) ? ticks : [];
    const lastTick = getLast(safeTicks);
    if (!lastTick) {
        console.log('[updateTicks] No lastTick, returning new array');
        return [...safeTicks, newTick];
    }
    if (typeof lastTick.epoch === 'undefined' || typeof newTick.epoch === 'undefined') {
        console.log('[updateTicks] lastTick or newTick missing epoch, returning safeTicks');
        return safeTicks;
    }
    if (lastTick.epoch >= newTick.epoch) {
        console.log('[updateTicks] lastTick.epoch >= newTick.epoch, returning safeTicks');
        return safeTicks;
    }
    const updated = [...safeTicks.slice(1), newTick];
    console.log('[updateTicks] updated:', updated);
    return updated;
};

export const updateCandles = (candles, ohlc) => {
    console.log('[updateCandles] candles:', candles, 'ohlc:', ohlc);
    const lastCandle = getLast(candles);
    if (!lastCandle) {
        console.log('[updateCandles] No lastCandle, returning new array');
        return [...candles, ohlc];
    }
    if (
        (lastCandle.open === ohlc.open &&
            lastCandle.high === ohlc.high &&
            lastCandle.low === ohlc.low &&
            lastCandle.close === ohlc.close &&
            lastCandle.epoch === ohlc.epoch) ||
        lastCandle.epoch > ohlc.epoch
    ) {
        console.log('[updateCandles] Candle unchanged or lastCandle.epoch > ohlc.epoch, returning candles');
        return candles;
    }
    const prevCandles = lastCandle.epoch === ohlc.epoch ? candles.slice(0, -1) : candles.slice(1);
    const updated = [...prevCandles, ohlc];
    console.log('[updateCandles] updated:', updated);
    return updated;
};

// filepath: c:\Users\Brian\Desktop\deriv-app-new-main\packages\bot-skeleton\src\services\api\binary-utils.js
export const getType = isCandle => {
    console.log('[getType] isCandle:', isCandle);
    // Default to 'ticks' if isCandle is undefined or falsy
    const type = isCandle === true ? 'candles' : 'ticks';
    console.log('[getType] type:', type);
    return type;
};