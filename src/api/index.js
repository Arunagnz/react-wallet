const express = require('express');

const transaction = require('./transaction');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: req.originalUrl
  });
});

router.use('/transaction', transaction);

module.exports = router;
