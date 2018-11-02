var mongoose = require("mongoose");
const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
};
exports.addMessage = async (req, res) => {
  await new Message(req.body).save();
  const messages = await Message.find();
  res.send(messages);
};
exports.deleteMessage = (req, res) => {
  console.log(req.body); // prints "bar"
  res.send("Yahoo message added!!!!");
};
