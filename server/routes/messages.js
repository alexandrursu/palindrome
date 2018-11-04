const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", (req, res) => {
  res.send("Welcome!");
});

router
  .route("/messages")
  /**
   * List all messages
   * @route GET /messages
   * @produces application/json application/xml
   * @returns {Array.<Message>} 200 - An array of messages info
   * @returns {Error} 400 - Not found
   */
  .get(messageController.getMessages)
  /**
   * Add message
   * @route POST /messages
   * @param {NewMessage.model} Object.body.required - New message text
   * @produces application/json application/xml
   * @returns {Message.model} 201 - Returns just created message
   * @returns {Error} 400 - BadRequest
   */
  .post(messageController.addMessage);

router
  .route("/messages/:id")
  /**
   * Palindrome Check
   * @route GET /messages:id
   * @param {string} id.query.required - message id
   * @produces application/json application/xml
   * @returns {boolean} 200 - Boolean
   * @returns {Error} 400 - Missing or wrong 'id' parameter
   */
  .get(messageController.getDetails)
  /**
   * Delete message
   * @route DELETE /messages:id
   * @param {string} id.query.required - message id
   * @produces application/json application/xml
   * @returns {string} 200 - Message deleted
   * @returns {Error} 400 - Missing or wrong 'id' parameter
   */
  .delete(messageController.deleteMessage);

/**
 * @typedef Message
 * @property {string} id.required
 * @property {string} message.required
 */

/**
 * @typedef NewMessage
 * @property {string} message.required
 */

module.exports = router;
