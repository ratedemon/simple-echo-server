const express = require('express');
const router = express.Router();
const addToQueue = require('./timer');
const timeValidator = require('./validator/echoAtTime');


router.post('/echoAtTime', timeValidator, (req, res) => {
  const { time, message } = req.body;
  addToQueue(time, message);
  res.status(200).json({
    success: true
  });
});

module.exports = router;