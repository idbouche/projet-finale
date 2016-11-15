var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/* The message schema attributes / characteristics / fields */
var chatSchema = new Schema({

  senderId     : { type: String},
  resoverId    : { type: String},
  message      : { type: String},
  senderName   : { type: String},
  resoverName  : { type: String},
  senderAvatar : { type: String},
  resoverAvatar: { type: String},
  created      : { type: Date},

});

module.exports = mongoose.model('Chat', chatSchema);