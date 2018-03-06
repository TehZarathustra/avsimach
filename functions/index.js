const functions = require('firebase-functions');
const express = require('express');
const config = require('config');

const app = express();
// const TOKEN = config.token;
// const bot = new TelegramBot(TOKEN, {polling: true});

//
const Telegraf = require('telegraf')

const bot = new Telegraf('')

// console.log('keeek >', process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'))

bot.startPolling();
//

app.get('/testkek', function (request, response) {
	console.log('config >>', config.token);
	console.log('in keks >>>');
	response.send('kek is working!');
});

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   console.log('on???');

//   bot.sendMessage(chatId, 'Received your message');
// });

exports.app = functions.https.onRequest(app);
