const {Telegraf} = require('telegraf');
const fs = require('fs');
require('dotenv').config();
const path = require('path');

const token = process.env.KEYBOT;

 //const bot = new Telegraf(token,{telegram: {agent: null,webhookReply:true,}});

const bot = new Telegraf(token)
//bot.telegram.deleteWebhook().then(success => {
//	success && console.log('🤖 is listening to your commands')
//	bot.startPolling()
//})

bot.hears('marco', async ctx => {
	//console.log(__dirname);
  const name = ctx.from.first_name
  ctx.reply(`Hello ${name ? name : 'friend'}! You managed to run me!`)
});

bot.hears('random', async ctx => {
	var imgs = path.join(__dirname, '/images/');
	var cant = contIMG.length;
	var rndm = Math.floor(Math.random() * cant);
	var url_ = imgs + contIMG[rndm];
	ctx.replyWithPhoto({source: url_});
});

//funciones
var contIMG = [];
var img = path.join(__dirname, '/images');
fs.readdir(img, function(err, archives) {
	if(err){
		return;
	}
	contIMG = archives;
	//console.log(contIMG);
});

bot.launch();
