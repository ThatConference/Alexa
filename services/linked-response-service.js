const generalUtils = require('../utils/general-utils');

const {
    LinkOutSuggestion
} = require('actions-on-google');

module.exports = {
    getCodeOfConductResponse: () => {
        return generalUtils.getRandomItemFromArray([
            {
                link: new LinkOutSuggestion({
                    name: "Code of Conduct",
                    url: `https://www.thatconference.com/Home/CodeOfConduct`
                }),
                text: `THAT Conference is dedicated to providing a harassment-free conference experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of conference participants in any form. Sexual language and imagery is not appropriate for any conference venue, including talks. Conference participants violating these rules may be sanctioned or expelled from the conference without a refund at the discretion of the conference organizers.`
            }
        ]);
    }
};