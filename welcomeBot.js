const { ActionTypes, ActivityHandler, CardFactory } = require("botbuilder")

class WelcomeBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const text = context.activity.text.toLowerCase();
            switch (text) {
                case 'hi': context.sendActivity(`You said "${context.activity.text}"`);
                    break;
                case 'hello': context.sendActivity(`You sail "${context.activity.text}"`)
                    break;
                case 'intro': await this.sendIntroCard(context);
            }
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            await context.sendActivity('Welcome to my channel');
            await context.sendActivity('Here You can see what bot can do for type hi'
                + 'In this example, the bot handles \'hello\', \'hi\', \'help\' and \'intro\'. ' +
                'Try it now, type \'hi\'');
            await next();
        })
    }
    async sendIntroCard(context) {
        const card = CardFactory.heroCard(
            'Welcome to Bot Framework!',
            'Welcome to Welcome Users bot sample! This Introduction card is a great way to introduce your Bot to the user and suggest some things to get them started. We use this opportunity to recommend a few next steps for learning more creating and deploying bots.',
            ['https://aka.ms/bf-welcome-card-image'],
            [
                {
                    type: ActionTypes.OpenUrl,
                    title: 'Get an overview',
                    value: 'https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0'
                },
                {
                    type: ActionTypes.OpenUrl,
                    title: 'Ask a question',
                    value: 'https://stackoverflow.com/questions/tagged/botframework'
                },
                {
                    type: ActionTypes.OpenUrl,
                    title: 'Learn how to deploy',
                    value: 'https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-deploy-azure?view=azure-bot-service-4.0'
                }
            ]
        );

        await context.sendActivity({ attachments: [card] });
    }

}
module.exports.WelcomeBot = WelcomeBot;
