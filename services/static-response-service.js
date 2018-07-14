const generalUtils = require('../utils/general-utils');
const {
    BasicCard,
    Button
} = require('actions-on-google');

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
    },
    getCommitmentToDiversityResponse: () => {
        return generalUtils.getRandomItemFromArray([
            {
                text: `THAT Conference believes in spreading the knowledge of innovators, tech enthusiasts, hobbyists and anyone else passionate about technology for that matter. We believe that this passion is enhanced by a variety of perspectives, and our goal is to create an inclusive, respectful conference environment that invites participation from people of all races, ethnicities, genders, ages, abilities, religions, sexual orientation, and educational and socioeconomic backgrounds.`,
                card: new BasicCard({
                    title: "Commitment to Diversity",
                    text: `We're actively seeking to increase the diversity of our attendees, speakers, and sponsors through our calls for proposals, other open submission processes, and through dialogue with the larger communities we serve.\n  This is an ongoing process. We are talking to our program chairs, program committees, and various innovators, experts, and organizations about this goal and about ways they can help us achieve it.`,
                    buttons: new Button({
                        title: "Our Commitment to Diversity",
                        url: "https://www.thatconference.com/Home/CommitmentToDiversity"
                    })
                })
            }
        ]);
    },
    getCallForSpeakersResponse: () => {
        return generalUtils.getRandomItemFromArray([
            {
                text: `Between February 1st and March 16th we were accepting presentation proposals for THAT Conference 2018.  For more information on this process, please go to https://www.thatconference.com/Sessions/CallForSpeakers.`,
                card: new BasicCard({
                    title: "Call for Speakers Policy",
                    text: `THAT Conference is not like most other conferences. We welcome people from all disciplines and backgrounds to talk about a wide variety of platforms and technologies. We want our presentations to engage the audience, spark discussion and inspire new ideas. The following is a list of a number of “Dos and Don’ts” which you can consider when writing your proposal and your presentation. Please don’t feel constrained to fulfilling all of these, they serve as guidelines, not rules, and there may be many valid reasons to break them.`,
                    buttons: new Button({
                        title: "Call for Speakers Policy",
                        url: "https://www.thatconference.com/Sessions/CallForSpeakers"
                    })
                })
            }
        ]);
    },
    getTravelInformation: () => {
        return generalUtils.getRandomItemFromArray([
            {
                text: `Due to awesome demand, both the Kalahari and Great Wolf room blocks have filled.  Rooms may still be available at the Kalahari and Great Wolf but will not be at the discounted rate.`,
                card: new BasicCard({
                    title: "Travel Information",
                    text: `Nearby hotels can be found on the linked page shown below.`,
                    buttons: new Button({
                        title: "The Campsite",
                        url: "https://www.thatconference.com/Resources/Travel"
                    })
                })
            }
        ]);
    }
};