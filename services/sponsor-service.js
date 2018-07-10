const generalUtils = require('../utils/general-utils');

const {
    BasicCard,
    Button
} = require('actions-on-google');

module.exports = {
    getBasicSponsorsResponse: () => {
        return generalUtils.getRandomItemFromArray([
            "This year's Platinum sponsors are CUNA Mutual Group, Northwestern Mutual, Microsoft, and Zymo Interactive."
        ]);
    },
    getDialogflowSponsorCardResponse: () => {
        return generalUtils.getRandomItemFromArray([
            {
                text: "THAT Conference wouldn't be possible without the support of our sponsors. A large portion of the conference costs are paid from sponsorships so that we can keep ticket costs affordable. Please take a few minutes to learn about our sponsors and let them know you appreciate their support of our community!",
                card: new BasicCard({
                    title: "2018 That Conference Sponsors",
                    image: {
                        url: "https://www.thatconference.com/images/icons/opengraph.jpg",
                        accessibilityText: "That Conference wide logo"
                    },
                    buttons: new Button({
                        title: "See all sponsors",
                        url: "https://www.thatconference.com/Sponsors"
                    })
                })
            },
            {
                text: "CUNA Mutual Group is a Platinum sponsor of this year's That Conference.",
                card: new BasicCard({
                    title: "CUNA Mutual Group",
                    subtitle: "Platinum Sponsor",
                    text: `We’re CUNA Mutual Group, and we’re proud to be a Platinum Sponsor of the official summer camp for geeks.\nWe’re an insurance and investment company, providing personal and commercial services. Oh, and we’re also an industry innovator and tech disruptor: developing cutting-edge solutions to help millions of people achieve financial security, every day.`,
                    image: {
                        url: "https://thatconference.blob.core.windows.net/sponsorimages/Cuna%20-%20web.png",
                        accessibilityText: "CUNA Mutual Group logo"
                    },
                    buttons: new Button({
                        title: "Visit CUNA Mutual Group",
                        url: "https://www.cunamutual.com/landing-pages/that-conference"
                    })
                })
            },
            {
                text: "Northwestern Mutual is a Platinum sponsor of this year's That Conference.",
                card: new BasicCard({
                    title: "Northwestern Mutual",
                    subtitle: "Platinum Sponsor",
                    text: `It's a great time to be here.  This is an exciting and important time to be a part of Northwestern Mutual. We're strong, innovative and growing. And we want you to grow with us.`,
                    image: {
                        url: "https://thatconference.blob.core.windows.net/sponsorimages/Northwestern%20Mutual%20-%20Web.png",
                        accessibilityText: "Northwestern Mutual logo"
                    },
                    buttons: new Button({
                        title: "Visit Northwestern Mutual",
                        url: "https://www.northwesternmutual.com/"
                    })
                })
            },
            {
                text: "Microsoft is a Platinum sponsor of this year's That Conference.",
                card: new BasicCard({
                    title: "Microsoft",
                    subtitle: "Platinum Sponsor",
                    text: `Build, design, develop.\nAny Developer. Any App. Any Platform.`,
                    image: {
                        url: "https://thatconference.blob.core.windows.net/sponsorimages/Microsoft%20-%20Web.png",
                        accessibilityText: "Microsoft logo"
                    },
                    buttons: new Button({
                        title: "Visit Microsoft",
                        url: "https://www.microsoft.com/"
                    })
                })
            },
            {
                text: "Zymo Interactive is a Platinum sponsor of this year's That Conference.",
                card: new BasicCard({
                    title: "Zymo Interactive",
                    subtitle: "Platinum Sponsor",
                    text: `Zymo Interactive is a Design-First Custom Mobile Product Development Studio located in Green Bay, Wisconsin!`,
                    image: {
                        url: "https://thatconference.blob.core.windows.net/sponsorimages/ZYMO%20Interactive%20-%20Web.png",
                        accessibilityText: "Zymo Interactive logo"
                    },
                    buttons: new Button({
                        title: "Visit Zymo Interactive",
                        url: "http://www.zymo.io/"
                    })
                })
            }
        ]);
    }
};