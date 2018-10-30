const express = require('express');
const router = express.Router();
const validateXML = require('../controllers/messagesController');

router.get('/', (req,res )=>{
    res.send('Yahoo validated!!!!')
});
router.get('/messages', validateXML.validate);

module.exports = router;
