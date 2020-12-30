const TeleBot = require("./charkiBot");//author: MarcoUrrutia(marcuXo)
const conn = require('./charkiBot/DDBB/Conn.db')
const modMSG = require('./charkiBot/DDBB/Modelo/MsgReport');
const path = require('path')
const token = process.env.KEYBOTEMISOR;
const HUrl='https://pruebot.herokuapp.com';
const bot = new TeleBot({token,
  // comentario
  webhook: { 
    url: HUrl,
    host: '0.0.0.0', 
    port: process.env.PORT, 
    maxConnections: 40
    },
  allowedUpdates: [],
});
console.log('PUERTO=>'+process.env.PORT);
bot.on(["/start"], (msg) => {
  console.log(`[Bot.New.User]${msg.chat.first_name} ${msg.chat.last_name}`);
  bot.sendMessage(msg.from.id, `Hola ${msg.chat.first_name}
  puedes enviar /menu para ver opciones.
  ${msg.from.id}`);
});


bot.on(["/menu"], async (msg) => {
  console.log(msg.from)
  bot.sendMessage(msg.from.id, 
    `HOLA SOY EL MENU!!
    `);
});

async function masiveAss(txt1){
  console.log(txt1);
  // bot.sendMessage('1130618498', 'Esto se activo desde una url'+txt1);
  // bot.sendMessage('1264770361', 'Esto se activo desde una url'+txt1);
}
bot.start();

module.exports = {
  "robot": masiveAss
}

// {
// id: 1130618498,
// is_bot: false,
// first_name: 'Marco',
// last_name: 'Urrutia Molina',
// language_code: 'es'
// }