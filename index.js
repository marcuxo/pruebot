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
    port: process.env.PORT || 443, 
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
  bot.sendMessage(msg.from.id, `
 /Agregar => Para incribirse y recibir mensajes de inyeccion fuera de rango.
 /salir => Para dejar de recibir mensajes
  `);
});

bot.on(['/Agregar'],async msg => {
  var agregar = await isAgregar(msg.chat.first_name, msg.from.id);
  return bot.sendMessage(msg.from.id, `
  Accion realizada con exito.
  Se te enviaran mensajes a medida que los datos
  sean ingresados y estos estén fuera del rango.
  -puedes enviar /Salir en cualquier momento 
  para dejar de recibir estos mensajes
  `);
});

bot.on(['/Salir'],async msg => {
  var salir = await isSalir(msg.from.id);
  return bot.sendMessage(msg.from.id, `
  Accion realizada con exito.
  puedes enviar en cualquier momento 
  /Agregar para volver a recibir mensajes
  `);
});

async function isAgregar(usuario, id){
  const queri = await modMSG.findOne({ID_CHAT: id}).countDocuments();
  if (queri) {
    const agrega = await modMSG.findOneAndUpdate({ ID_CHAT: id }, {$set: { SEND_MSG: 1 }})
  } else {
    const modelo = new modMSG({
      NOMBRE: usuario,
      ID_CHAT: id,
      SEND_MSG: 1
    });
    //const save = await modelo.save();
  }
  
  return
};

async function isSalir(id){
  const sacar = await modMSG.findOneAndUpdate({ ID_CHAT: id }, {$set: { SEND_MSG: 0 }});
  return
}

async function masiveAss(txt1){
  const findin = await modMSG.find({SEND_MSG: 1});
  for (let r = 0; r < findin.length; r++) {
    const element = await findin[r];
    bot.sendMessage(element.ID_CHAT, 'INYECCION FUERA DE RANGO => '+txt1[1]+" => "+txt1[2]+"% Y DEBERIA SER "+txt1[3]+"%")
  }
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