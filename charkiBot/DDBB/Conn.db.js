const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('useFindAndModify', true);
mongoose.connect('mongodb+srv://'+process.env.DDBBUSER+':'+process.env.DDBBKEY+'@vitacora.oslqz.mongodb.net/'+process.env.DDBBNAME+'?retryWrites=true&w=majority',{
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
})
.then(db => console.log('|=>DB'))
.catch(err => console.error(err))

dbc = mongoose.connection;

module.exports = dbc;