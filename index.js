const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { WelcomeBot } = require('./welcomeBot');


const server = restify.createServer();
server.listen(3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

const adapter = new BotFrameworkAdapter();
const bot = new WelcomeBot();

server.post('/api/WelcomeMessage', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});