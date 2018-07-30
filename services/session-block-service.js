const
    sessionBlocksJSON = require('../data/session-blocks.json'),
    {DateTime, Interval} = require('luxon');

const sessionBlocks = sessionBlocksJSON.map(sb => ({
    id: sb.id,
    type: sb.type,
    start: DateTime.fromISO(sb.start),
    end: DateTime.fromISO(sb.end)
}));

const isBetween = (dateTime, start, end) => Interval.fromDateTimes(start, end).contains(dateTime);

const isInSessionBlocks = (sessionTime, blocks) => {
    if(!sessionTime || !blocks || !blocks.some) return false;

    return blocks.some(b => Interval.fromDateTimes(b.start, b.end).contains(sessionTime));
};

const getSessionBlocksByTime = (sessionTime) => sessionBlocks.filter(sb => isBetween(sessionTime, sb.start, sb.end));
const getSessionBlocksByRange = (rangeStart, rangeEnd) => sessionBlocks.filter(sb => isBetween(sb.start, rangeStart, rangeEnd));
const getSessionBlocksForPeriod = (sessionTime, startHour, endHour) => getSessionBlocksByRange(sessionTime.set({hour: startHour}), sessionTime.set({hour: endHour}));
const getMorningSessionBlocks = (sessionTime) => getSessionBlocksForPeriod(sessionTime, 7, 11);
const getAfternoonSessionBlocks = (sessionTime) => getSessionBlocksForPeriod(sessionTime, 12, 16);
const getEveningSessionBlocks = (sessionTime) => getSessionBlocksForPeriod(sessionTime, 17, 23);

const getNextSessionBlocks = (sessionTime) => {
    const currentBlocks = getSessionBlocksByTime(sessionTime);

    const highestBlockId = currentBlocks.reduce((high, cb) => Math.max(high, cb.id), -1);

    const nextBlock = sessionBlocks.find(sb => sb.id === (highestBlockId + 1));

    return nextBlock ? getSessionBlocksByTime(nextBlock.start) : [];
};

const getDayFromDayOfWeek = (dateTime) => {
    switch(dateTime.weekday) {
        case 1: return 6;
        case 2: return 7;
        case 3: return 8;
        case 4: return 9;
        case 5: return 3;
        case 6: return 4;
        case 7: return 5;
    }
};

const getLaterSessionBlocks = (sessionTime) => {
    let hour = sessionTime.hour;

    if(hour < 7) return getMorningSessionBlocks(sessionTime);
    else if(hour < 12) return getAfternoonSessionBlocks(sessionTime);
    else if(hour < 17) return getEveningSessionBlocks(sessionTime);
    else return getMorningSessionBlocks(sessionTime.plus({days: 1}));
};

const getUpdatedSessionBlocksFromDialogflowSessionTime = (original, sbiSessionTime) => {
    if(!sbiSessionTime) return [];

    switch(sbiSessionTime) {
        case 'next': return getNextSessionBlocks(original);
        case 'afternoon': return getAfternoonSessionBlocks(original);
        case 'evening': return getEveningSessionBlocks(original);
        case 'morning': return getMorningSessionBlocks(original);
        case 'later': return getLaterSessionBlocks(original);
        default: return [];
    }
};

const sessionIsInSessionBlocks = (session, sessionBlockInfo) => {
    if(!sessionBlockInfo || !(sessionBlockInfo.date && sessionBlockInfo.sessionTime)) return true;

    const sessionTime = DateTime.fromISO(session.ScheduledDateTime);
    let searchTime = DateTime.local();

    if(sessionBlockInfo.date) {
        searchTime = DateTime.fromISO(sessionBlockInfo.date);
    }

    // Change entered date to a valid date of TC.
    const day = getDayFromDayOfWeek(searchTime);
    searchTime = searchTime.set({month: 8, day: day});

    const blocks = sessionBlockInfo.sessionTime ?
        getUpdatedSessionBlocksFromDialogflowSessionTime(searchTime, sessionBlockInfo.sessionTime) :
        getSessionBlocksByTime(searchTime);

    return blocks && isInSessionBlocks(sessionTime, blocks);
};

module.exports = {
    sessionIsInSessionBlocks
};