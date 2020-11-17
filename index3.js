const telegramBot = require('node-telegram-bot-api');

const token = process.env.KEYBOT;

const bot = new telegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
	const chatId = msg.chat.id;
	const resp = match[1];
	bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');
});

