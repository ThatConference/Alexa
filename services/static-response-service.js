const generalUtils = require('../utils/general-utils');

module.exports = {
    getWelcomeResponse: () => {
        return generalUtils.getRandomItemFromArray([
            "Welcome to the That Conference assistant!  I can help you find sessions, rooms, and all kind of other information about the conference.  What would you like to know?"
        ]);
    },
    getAboutResponse: () => {
        return generalUtils.getRandomItemFromArray([
            "That Conference, simply put, is summer camp for geeks. What else would you like to know?",
            "That Conference is a tech conference for developers, rooted in community, exploring the internet of things, and all technologies used for mobile, web & cloud. It all happens at a giant waterpark, because we are strong believers in good times. There will be bacon. Lots of it. What else would you like to hear about?",
            "Held at the Kalahari Resort in the beautiful Wisconsin Dells, That Conference is your last chance to get away before summer slips away. Spend three days with a thousand of your fellow campers and their families, geeking out on everything from writing some epic code to making paper airplanes.  What else would you like to know?",
            "With so many sessions to choose from, your head will eventually start to overheat. Cool off in one of the many nearby pools, because unlike your traditional technology conference, you will be camping at a giant indoor waterpark. Be sure to follow us on Twitter and like us out on Facebook. Then start practicing your cannonballs. But first, how else can I help you?"
        ]);
    },
    getHelpResponse: () => {
        return generalUtils.getRandomItemFromArray([
            `You can say something like "Tell me about a DevOps session" or "What's today's keynote?"  How can I help?`
        ]);
    },
    getUnknownResponse: () => {
        return generalUtils.getRandomItemFromArray([
            "I didn't get that. Can you say it again?",
            "I missed what you said. Say it again?",
            "Sorry, could you say that again?",
            "Sorry, can you say that again?",
            "Can you say that again?",
            "Sorry, I didn't get that.",
            "Sorry, what was that?",
            "One more time?",
            "What was that?",
            "Say that again?",
            "I didn't get that.",
            "I missed that."
        ]);
    },
    getGoodbyeResponse: () => {
        return generalUtils.getRandomItemFromArray([
            "Goodbye, farewell, and adios!",
            "So long for now, friend."
        ]);
    },
    getCodeOfConductResponse: () => {
        return generalUtils.getRandomItemFromArray([
            "THAT Conference is dedicated to providing a harassment-free conference experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of conference participants in any form. Sexual language and imagery is not appropriate for any conference venue, including talks. Conference participants violating these rules may be sanctioned or expelled from the conference without a refund at the discretion of the conference organizers."
        ]);
    }
};