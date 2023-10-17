import { Telegraf } from 'telegraf';
import { Application, Router } from '@cfworker/web';
import createTelegrafMiddleware from 'cfworker-middleware-telegraf';
import { Ai } from '@cloudflare/ai';

const ai = new Ai(AI);
const bot = new Telegraf(BOT_TOKEN);
bot.on('text', async (ctx) => {
	const { response } = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
		prompt: '[INST] ' + ctx.message.text + ' [/INST]',
	});
	return ctx.reply(response);
});

const router = new Router();
router.post('/', createTelegrafMiddleware(bot));
new Application().use(router.middleware).listen();
