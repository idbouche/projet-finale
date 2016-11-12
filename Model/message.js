var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/* The message schema attributes / characteristics / fields */
var messageSchema = new Schema({

  userId       :  { type: String},
  message      :  { type: String},
  userName     : { type: String},
  messageAvatar:{ type: String},
  created      : { type: Date, default: Date.now },
  updated      : { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);