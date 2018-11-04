var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  message: {
    type: String,
    required: "Empty strings are not allowed!"
  }
});

module.exports = mongoose.model("Message", MessageSchema);
