const express = require('express');
const router = express.Router();
const gallery = require('../models/gallery');

//Route call gallery model to create a new gallery in db.
router.post('/', (req, res, next) => {
  const name = req.body.name;
  gallery.create(name, (err, id) => {
    //If error send error and exit.
    if(err) return res.status(500).send(err);
    //Redirect User To New Gallery
    res.redirect(`/Galleries/${id}`)
  })
})

//Renders Page To Add NEW Gallery
router.get('/new', (req, res, next) => {
  res.render('gallery/new');
})

module.exports = router;
