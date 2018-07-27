const
    request = require('request'),
    sessionUrl = "http://fazbook:2323/getallacceptedsessions.json",
    speakersUrl = "http://fazbook:2323/getspeakers-2018.json";

let sessions = [],
    speakers = [];

const loadTCData = () => {
    loadSessions();
    loadSpeakers();
};

const loadSessions = () => {
    loadDataset(sessionUrl)
        .then((data) => {
            sessions = data;
            console.log("Session loading complete.");
        })
        .catch((err) => {
            sendErrorMessage(`Error loading sessions: ${err}`)
        });
};

const loadSpeakers = () => {
    loadDataset(speakersUrl)
        .then((data) => {
            speakers = data;
            console.log("Speakers loading complete.");
        })
        .catch((err) => {
            sendErrorMessage(`Error loading speakers: ${err}`)
        });
};

const loadDataset = (url) => {
    return new Promise((res, rej) => {
        request(url, (err, resp, body) => {
            if (err) {
                sendErrorMessage(err);
                rej(err);
            } else {
                res(JSON.parse(body));
            }
        });
    });
};

const sendErrorMessage = (message) => {
    console.log(`Error: ${message}`)
};

module.exports = {
    loadTCData,
    getSessions: () => sessions,
    getSpeakers: () => speakers
};