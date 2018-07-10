const
    responseUtils = require('../utils/response-utils'),
    staticResponse = require('../services/static-response-service'),
    sponsorService = require('../services/sponsor-service');

const {
    dialogflow
} = require('actions-on-google');

const respond = (app, response, end, noQuestion) => {
    if (!response) {
        response = `I'm sorry, I'm having trouble processing your request.`;
        if (end) app.close(response);
        else app.ask(`${response}  Please try again.`);
    }
    if (end) {
        app.close(response);
    } else {
        app.ask(`${response}${noQuestion ? '' : `  ${responseUtils.getEndingQuestion()}`}`);
    }
};

const
    defaultExitIntent = conv => {
        conv.close(staticResponse.getGoodbyeResponse());
    },
    about = conv => {
        respond(conv, staticResponse.getAboutResponse(), false, true);
    },
    sponsors = conv => {
        const response = sponsorService.getDialogflowSponsorCardResponse();

        conv.ask(response.text);
        conv.ask(response.card);
    };

module.exports = () => {
    const dfApp = dialogflow();

    dfApp.intent("Default Exit Intent", defaultExitIntent);
    dfApp.intent("About", about);
    dfApp.intent("Sponsors", sponsors);

    return dfApp;
};