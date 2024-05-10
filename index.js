import { Telegraf } from 'telegraf';
import { Application, Router } from '@cfworker/web';
import createTelegrafMiddleware from 'cfworker-middleware-telegraf';

const bot = new Telegraf(BOT_TOKEN);
bot.command('start', (ctx) => ctx.reply("Hello, I'm an AI, ask me a question"));
bot.on('text', async (ctx) => {
	const { response } = await AI.run('@cf/meta/llama-3-8b-instruct', {
		prompt: '[INST] ' + ctx.message.text + ' [/INST]',
	});
	return ctx.reply(response);
});

const router = new Router();
router.post('/', createTelegrafMiddleware(bot));
new Application().use(router.middleware).listen();
