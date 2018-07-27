const
    Alexa = require('alexa-sdk'),
    linkedResponses = require('../services/linked-response-service'),
    staticResponses = require('../services/static-response-service'),
    responseUtils = require('../utils/response-utils'),
    gettingInvolvedService = require('../services/getting-involved-service'),
    sponsorService = require('../services/sponsor-service');

const respond = function (emit, response, end, noQuestion) {
    if (!response) {
        response = `I'm sorry, I'm having trouble processing your request.`;
        if (end) emit(':tell', response);
        else emit(':ask', `${response}  Please try again.`);
    }
    if (end) {
        emit(':tell', response);
    } else {
        emit(':ask', `${response}${noQuestion ? '' : `  ${responseUtils.getEndingQuestion()}`}`);
    }
};

const handlers = {
    'LaunchRequest': function () {
        respond(this.emit, staticResponses.getWelcomeResponse(), false, true);
    },
    'Unhandled': function () {
        respond(this.emit, staticResponses.getHelpResponse(), false, true);
    },
    'About': function() {
        respond(this.emit, staticResponses.getAboutResponse(), false, true);
    },
    'CallForSpeakers': function() {
        respond(this.emit, staticResponses.getCallForSpeakersResponse().text);
    },
    'CodeOfConduct': function() {
        respond(this.emit, linkedResponses.getCodeOfConductResponse().text);
    },
    'CommitmentToDiversity': function() {
        respond(this.emit, staticResponses.getCommitmentToDiversityResponse().text);
    },
    'GettingInvolved': function() {
        respond(this.emit, gettingInvolvedService.getBasicGettingInvolvedResponse().text);
    },
    'Sessions': function() {
        //TODO: This is going to be a biggie...
        //respond(this.emit, sponsorService.getBasicSponsorsResponse());
    },
    'Sponsors': function() {
        respond(this.emit, sponsorService.getBasicSponsorsResponse());
    },
    'Travel': function() {
        respond(this.emit, staticResponses.getTravelInformation().text);
    },
    'AMAZON.CancelIntent': function() {
        respond(this.emit, staticResponses.getGoodbyeResponse(), true);
    },
    'AMAZON.FallbackIntent': function() {
        respond(this.emit, staticResponses.getUnknownResponse());
    },
    'AMAZON.StopIntent': function() {
        respond(this.emit, staticResponses.getGoodbyeResponse(), true);
    }
};

module.exports = (req, res) => {
    const context = {
        succeed: function (result) {
            res.json(result);
        },
        fail: function (error) {
            console.error("Failed", error);
        }
    };

    const alexa = Alexa.handler(req.body, context);
    alexa.appId = 'amzn1.ask.skill.2e29b055-ad5d-4579-91b0-67514e6d9c12';
    alexa.registerHandlers(handlers);
    alexa.execute();
};