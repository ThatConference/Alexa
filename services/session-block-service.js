const
    sessionBlocks = require('../data/session-blocks.json'),
    {DateTime, Interval} = require('luxon');

const isBetween = (dateTimeString, startDateString, endDateString) => {
    const
        dateTime = DateTime.fromISO(dateTimeString),
        start =  DateTime.fromISO(startDateString),
        end = DateTime.fromISO(endDateString);

    return Interval.fromDateTimes(start, end).contains(dateTime);
};

const getSessionBlockByTime = (sessionTime) => sessionBlocks.find(sb => isBetween(sessionTime, sb.start, sb.end));

const getNextSessionBlock = (sessionTime) => {
    const currentBlock = getSessionBlockByTime(sessionTime);

    return sessionBlocks[currentBlock.id + 1];
};

module.exports = {
    getSessionBlockByTime,
    getNextSessionBlock
};