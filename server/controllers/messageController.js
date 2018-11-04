const isPalindrome = require("is-palindrome");
const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (e) {
    res.status(400).send({ message: "Not found" });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const message = await new Message(req.body).save();
    res.status(201).json(message);
  } catch (e) {
    // Empty strings are validated on UI and Schema
    res.status(400).send(e);
  }
};

exports.getDetails = async (req, res) => {
  try {
    let message = await Message.findOne({ _id: req.params.id });
    let isMessagePalindrome = isPalindrome(message.message);
    res.json(isMessagePalindrome);
  } catch (e) {
    res.status(400).send({ message: "Missing or wrong 'id' parameter" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Message deleted" });
  } catch (e) {
    res.status(400).send({ message: "Missing or wrong 'id' parameter" });
  }
};
