const
    generalUtils = require('../utils/general-utils'),
    {BasicCard, Button} = require('actions-on-google');

module.exports = {
    getBasicGettingInvolvedResponse: () => {
        return generalUtils.getRandomItemFromArray([
            {
                text: `We need you to make this a great event.  How do you get involved?  Email us, join the crew on Slack, follow us on Twitter and Facebook, and find out more about sponsorships.`,
                card: new BasicCard({
                    title: "Getting Involved",
                    text: `We need you to make this a great event.  How do you get involved?  Email us, join the crew on Slack, follow us on Twitter and Facebook, and find out more about sponsorships.`,
                    buttons: new Button({
                        title: "Getting Involved",
                        url: "https://www.thatconference.com/Resources/GettingInvolved"
                    })
                })
            }
        ]);
    },
    //TODO: This is being a pain, so I'm holding off for now.  The follow-up response isn't working as expected.
    findGettingInvolvedResponse: (cardName) => {
        if (!cardName) return '';

        switch (cardName.toLowerCase()) {
            case 'email':
                return {
                    text: `As simple as it may sound, one of the best ways to provide feedback or just chat with us is via good ole email. You can reach the board members at Hello@THATConference.com and we are pretty good at responding within a day or so. Got an idea, want to make a comment, or better yet compliment us; hit us on email.`,
                    card: new BasicCard({
                        title: "Email",
                        subtitle: "Hello@THATConference.com",
                        buttons: new Button({
                            title: "Email",
                            url: "mailto: Hello@THATConference.com"
                        })
                    })
                };
            case 'slack':
                return {
                    text: `We have a public Slack channel, and at any given time you can find a healthy mix of community members and organize	rs out there to answer your questions. Be part of the conversation. Help us build the community you want to see.`,
                    card: new BasicCard({
                        title: "Slack",
                        subtitle: "http://thatslack.thatconference.com/",
                        buttons: new Button({
                            title: "Slack",
                            url: "http://thatslack.thatconference.com/"
                        })
                    })
                };
        }
    }
};