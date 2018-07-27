const
    responseUtils = require('../utils/response-utils'),
    linkedResponses = require('../services/linked-response-service'),
    staticResponses = require('../services/static-response-service'),
    gettingInvolvedService = require('../services/getting-involved-service'),
    sessionService = require('../services/session-service'),
    sponsorService = require('../services/sponsor-service');

const {
    dialogflow
} = require('actions-on-google');

const respond = (app, response, end, noQuestion) => {
    if (!response) {
        response = `I'm sorry, I'm having trouble processing your request.`;
        if (end) app.close(response);
        else app.ask(`${response}  Please try again.`);
    } else {
        if (end) {
            app.close(response);
        } else {
            if (response instanceof String) {
                app.ask(`${response}${noQuestion ? '' : `  ${responseUtils.getEndingQuestion()}`}`);
            } else {
                if(response.context) {
                    app.contexts.set(response.context.name, 1, {value: response.context.value});
                }
                app.ask(`${response.text}${noQuestion ? '' : `  ${responseUtils.getEndingQuestion()}`}`);
                app.ask(response.gaResponse);
            }
        }
    }
};

const
    defaultExitIntent = conv => {
        conv.close(staticResponses.getGoodbyeResponse());
    },
    about = conv => {
        respond(conv, staticResponses.getAboutResponse(), false, true);
    },
    callForSpeakers = conv => {
        const response = staticResponses.getCallForSpeakersResponse();

        respond(conv, {text: response.text, gaResponse: response.card});
    },
    codeOfConduct = conv => {
        const response = linkedResponses.getCodeOfConductResponse();

        respond(conv, {text: response.text, gaResponse: response.link});
    },
    commitmentToDiversity = conv => {
        const response = staticResponses.getCommitmentToDiversityResponse();

        respond(conv, {text: response.text, gaResponse: response.card});
    },
    gettingInvolved = conv => {
        const response = gettingInvolvedService.getBasicGettingInvolvedResponse();

        respond(conv, {text: response.text, gaResponse: response.card})
    },
    gettingInvolvedNextSteps = conv => {
        const response = gettingInvolvedService.findGettingInvolvedResponse(conv.query);

        respond(conv, {text: response.text, gaResponse: response.card})
    },
    sponsors = conv => {
        const response = sponsorService.getDialogflowSponsorCardResponse();

        respond(conv, {text: response.text, gaResponse: response.card});
    },
    sessions = conv => {
        const params = conv.parameters || {};
        const response = sessionService.getRandomSession(params.category, params.level, params.room, params.sessionTime);

        respond(conv, {text: response.text, gaResponse: response.card, context: response.context});
    },
    sessionSpeaker = conv => {
        const params = conv.parameters || {};
        const sessionIdContext = conv.contexts.get('sessionid');
        const response = sessionService.getSessionSpeakerById(
            sessionIdContext.parameters.value,
            params.firstName || params.lastName
        );

        respond(conv, {text: response.text, gaResponse: response.card, context: response.context});
    },
    sessionDescription = conv => {
        const params = conv.parameters || {};
        const sessionIdContext = conv.contexts.get('sessionid');
        const response = sessionService.getSessionDescriptionById(sessionIdContext.parameters.value);

        respond(conv, {text: response.text, gaResponse: response.card, context: response.context});
    },
    travel = conv => {
        const response = staticResponses.getTravelInformation();

        respond(conv, {text: response.text, gaResponse: response.card});
    };

module.exports = () => {
    const dfApp = dialogflow();

    dfApp.intent("Default Exit Intent", defaultExitIntent);
    dfApp.intent("About", about);
    dfApp.intent("Call for Speakers Policy", callForSpeakers);
    dfApp.intent("Code of Conduct", codeOfConduct);
    dfApp.intent("Commitment to Diversity", commitmentToDiversity);
    dfApp.intent("Getting Involved", gettingInvolved);
    dfApp.intent("Getting Involved - Next Steps", gettingInvolvedNextSteps);
    dfApp.intent("Sessions", sessions);
    dfApp.intent("Sessions - Speaker", sessionSpeaker);
    dfApp.intent("Sessions - Description", sessionDescription);
    dfApp.intent("Sponsors", sponsors);
    dfApp.intent("Travel", travel);

    return dfApp;
};