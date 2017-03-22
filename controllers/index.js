const express = require('express');
const router = express.Router();
const gallery = require('../models/gallery');

//Define All Routes
// router.use('/galleries', require('./galleries'));


//Home Router
router.get('/', (req, res, next) => {
  res.render('gallery/index');
});

module.exports = router;
