const
    Alexa = require('alexa-sdk'),
    staticResponse = require('../services/static-response-service'),
    generalUtils = require('../utils/general-utils'),
    responseUtils = require('../utils/response-utils'),
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
        this.emit(':ask', staticResponse.getWelcomeResponse());
    },
    'About': function() {
        respond(this.emit, staticResponse.getAboutResponse(), false, true);
    },
    'Sponsors': function() {
        respond(this.emit, sponsorService.getBasicSponsorsResponse());
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', staticResponse.getGoodbyeResponse());
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', staticResponse.getGoodbyeResponse());
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