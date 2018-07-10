const utils = require('./general-utils');

const endingQuestions = [
    "Anything else I can help with?",
    "What else would you like to know?",
    "Anything else?",
    "May I assist you further?",
    "What else can I do for you?"
];

module.exports = {
    getEndingQuestion: () => utils.getRandomItemFromArray(endingQuestions)
};