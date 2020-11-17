const mongoose = require('mongoose');
const { Schema } = mongoose;

const msgSchema = new Schema({
  "NOMBRE": { type: String },
  "ID_CHAT": { type: String },
  "SEND_MSG": { type: Boolean },
});

module.exports = mongoose.model('msgreport', msgSchema);