const
    {DateTime, Interval, Settings} = require('luxon');

Settings.defaultZoneName = 'UTC-5';

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if(source.hasOwnProperty(key)) {
                if (isObject(source[key])) {
                    if (!target[key]) Object.assign(target, {[key]: {}});
                    mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, {[key]: source[key]});
                }
            }
        }
    }

    return mergeDeep(target, ...sources);
}

module.exports = {
    getRandomItemFromArray: (array) => array[Math.floor(Math.random() * array.length)],
    getProperListText: (arr) => {
        if (!arr) return "";

        if(arr.length < 3) {
            return arr.join(" and ");
        } else {
            const base = arr.join(", ");
            return `${base.slice(0, base.lastIndexOf(", "))}, and${base.substring(base.lastIndexOf(", ") + 1)}`
        }
    },
    getDateTimeTextInfo: (dateTime) => {
        const dt = DateTime.fromISO(dateTime);
        const now = new DateTime({});
        let dayText = dt.toFormat('EEEE');
        if(dt.month === now.month) {
            const dayDiff = dt.day - now.day;
            switch (dayDiff) {
                case 0:
                    dayText = "today";
                    break;
                case -1:
                    dayText = "yesterday";
                    break;
                case 1:
                    dayText = "tomorrow";
                    break;
            }
        }

        return {
            text: `${dt.toLocaleString(DateTime.TIME_SIMPLE)} ${dayText}`,
            inPast: dt.diffNow().milliseconds < 0
        }
    },
    objectsAreEquivalent: (a, b) => {
        // Create arrays of property names
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length !== bProps.length) {
            return false;
        }

        for (let i = 0; i < aProps.length; i++) {
            let propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    },
    mergeDeep: mergeDeep,
    getAlexaSlotId: (slot) => {
        let id = slot.value;

        if(slot.resolutions &&
            slot.resolutions.resolutionsPerAuthority &&
            slot.resolutions.resolutionsPerAuthority[0] &&
            slot.resolutions.resolutionsPerAuthority[0].values &&
            slot.resolutions.resolutionsPerAuthority[0].values[0] &&
            slot.resolutions.resolutionsPerAuthority[0].values[0].value) {
            id = slot.resolutions.resolutionsPerAuthority[0].values[0].value.id || slot.value;
        }

        return id;
    }
};