const
    generalUtils = require('../utils/general-utils'),
    dataService = require('./tc-data-service'),
    sessionBlockService = require('./session-block-service'),
    {BasicCard, Button} = require('actions-on-google'),
    {DateTime, Interval, Settings} = require('luxon');

const getSessionById = (sessionId) => dataService.getSessions().find((s) => s.Id === sessionId);

module.exports = {
    getGenericFallbackResponse: () => {
        return "I'm sorry, I couldn't find any sessions."
    },
    getSessionSpeakerById: (sessionId, name) => {
        const session = getSessionById(sessionId);
        const speaker = name ?
            session.Speakers.find(s => s.FirstName.toLowerCase().trim() === name.toLowerCase() || s.LastName.toLowerCase().trim() === name.toLowerCase()) || generalUtils.getRandomItemFromArray(session.Speakers):
            generalUtils.getRandomItemFromArray(session.Speakers);

        return {
            text: speaker.Biography,
            context: {
                name: 'sessionid',
                value: session.Id
            },
            card: new BasicCard({
                title: `${speaker.FirstName} ${speaker.LastName}`,
                text: speaker.Biography,
                image: `https://${speaker.HeadShot}`,
                buttons: new Button({
                    title: "Website",
                    url: speaker.WebSite
                })
            })
        };
    },
    getSessionDescriptionById: (sessionId) => {
        const session = getSessionById(sessionId);
        const speakers = generalUtils.getProperListText(session.Speakers.map(s => `${s.FirstName} ${s.LastName}`));

        return {
            text: session.Description,
            subtitle: speakers,
            context: {
                name: 'sessionid',
                value: session.Id
            },
            card: new BasicCard({
                title: session.Title,
                text: session.Description,
                buttons: new Button({
                    title: session.Title,
                    url: `https://www.thatconference.com/sessions/session/${session.Id}`
                })
            })
        };
    },
    getRandomSession: (category, level, room, sessionBlockInfo) => {
        const filteredSessions = dataService.getSessions()
            .filter((s) => s.Accepted && !s.Canceled)
            .filter((s) =>
                !category ||
                s.PrimaryCategory.toLowerCase() === category.toLowerCase() ||
                (s.SecondaryCategory && s.SecondaryCategory.toLowerCase() === category.toLowerCase()))
            .filter((s) => !level || level === s.Level )
            .filter((s) => !room || room.toLowerCase() === s.ScheduledRoom.toLowerCase())
            .filter((s) => sessionBlockService.sessionIsInSessionBlocks(s, sessionBlockInfo));

        const session = generalUtils.getRandomItemFromArray(filteredSessions);
        if(!session) {
            return {
                text: `No sessions or events were found then.`,
                card: new BasicCard({
                    title: "No Sessions/Events Found.",
                    text: "Sorry, I couldn't find any sessions or events.",
                    buttons: new Button({
                        title: "Schedule",
                        url: `https://www.thatconference.com/Schedule`
                    })
                })
            };
        }

        const speakers = generalUtils.getProperListText(session.Speakers.map(s => `${s.FirstName} ${s.LastName}`));
        const dateTimeTextInfo = generalUtils.getDateTimeTextInfo(session.ScheduledDateTime);
        return {
            text: `${session.Title} with ${speakers} ${dateTimeTextInfo.inPast ? "was" : "is"} at ${dateTimeTextInfo.text} in ${session.ScheduledRoom}.`,
            context: {
                name: 'sessionid',
                value: session.Id
            },
            card: new BasicCard({
                title: session.Title,
                subtitle: speakers,
                text: session.Description,
                buttons: new Button({
                    title: session.Title,
                    url: `https://www.thatconference.com/sessions/session/${session.Id}`
                })
            })
        };
    }
};