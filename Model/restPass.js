var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/* The message schema attributes / characteristics / fields */
var RestPass = new Schema({

  idU    : { type: String},
  email    : { type: String},
  date      : { type: Date},

});

module.exports = mongoose.model('Reset', RestPass);