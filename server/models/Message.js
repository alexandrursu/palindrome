var mongoose = require("mongoose");
var isPalindrome = require("is-palindrome");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  message: {
    type: String,
    required: "Please enter a message!"
  },
  isPalindrome: {
    type: Boolean
  }
});

MessageSchema.pre("save", function(next) {
  this.isPalindrome = isPalindrome(this.message);
  console.log(isPalindrome(this.message));
  next();
});

module.exports = mongoose.model("Message", MessageSchema);
