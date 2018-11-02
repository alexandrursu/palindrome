const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", (req, res) => {
  res.send("Yahoo validated!!!!");
});
router.get("/messages", messageController.addMessage);
router.post("/messages", messageController.addMessage);

module.exports = router;
