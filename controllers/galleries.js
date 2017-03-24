const express = require('express');
const router = express.Router();
const gallery = require('../models/gallery');

//Route calls gallery model to create a new gallery in db.
router.post('/', (req, res, next) => {
  const name = req.body.name;
  gallery.create(name, (err, id) => {
    //If error send error and exit.
    if(err) return res.status(500).send(err);
    //Redirect User To New Gallery
    res.redirect(`/Galleries/${id}`);
  });
});

//Renders Page To Add NEW Gallery
router.get('/new', (req, res, next) => {
  res.render('gallery/new');
});

//Route calls gallery model to get relevent information for specfic gallery.
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  gallery.get(id, (err, { name }, images) => {
    //If error send error and exit.
    if (err) return res.status(500).send(err);

    const gallery = { id, name, images };
    console.log(gallery);
    //Renders Page To Show Specifc Gallery
    res.render('gallery/show', { gallery });
  });
});

//Deletes Gallery From model and redirect user to index.
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
   console.log('route hit');
  gallery.delete(id, (err) => {
    if (err) return res.send(500, err);

    res.redirect('/');
  });
});

module.exports = router;
