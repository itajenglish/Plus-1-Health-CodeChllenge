const express = require('express');
const router = express.Router();
const gallery = require('../models/gallery');

//Define All Routes
router.use('/galleries', require('./galleries'));


//Home Router
router.get('/', (req, res, next) => {
  //Get all galleries from database
  gallery.all((err, galleries) => {
    //If an error happend send error in response and exit.
    if(err) return res.send(err);
    //Render index page with all galleries
    res.render('gallery/index', galleries);
  });
});

module.exports = router;
