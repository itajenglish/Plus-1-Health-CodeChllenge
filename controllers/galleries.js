const express = require('express');
const router = express.Router();
const gallery = require('../models/gallery');
const image = require('../models/image');

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
    //Renders Page To Show Specifc Gallery
    res.render('gallery/show', { gallery });
  });
});

//Route calls gallery model to update name in db.
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;

  gallery.update(id, name, (err) => {
    //If error send error and exit.
    if (err) return res.status(500).send(err);

    //After Successful name update return to galleries#view
    res.redirect(`/galleries/${id}`);
  });
});

//Render Edit Page For Specifc Gallery
router.get('/:id/edit', (req, res , next) => {
  const id = req.params.id;

  gallery.get(id, (err, { name }) => {
    //If error send error and exit.
    if (err) return res.status(500).send(err);

    const gallery = { id, name };
    //Renders Page To Show Specifc Gallery
    res.render('gallery/edit', { gallery });
  });
});

//Route calls gallery model to delete gallery and realted images.
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  gallery.delete(id, (err) => {
    //If error send error and exit.
    if (err) return res.status(500).send(err);

    //Redirect to index page after Successful delte.
    res.redirect('/');
  });
});

//Route calls image model to update caption in db.
router.put('/:gallery_id/images/:image_id', (req, res, next) => {
  const id = req.params.image_id;
  const caption = req.body.caption;
  console.log(caption);

  image.update(id, caption, (err) => {
    //If error send error and exit.
    if (err) return res.status(500).send(err);

    //Refresh page with new data;
    res.redirect('back');
  });
});

//Route calls image model to delete specfic image.
router.delete('/:gallery_id/images/:image_id', (req, res, next) => {
  const id = req.params.image_id;

  image.delete(id, (err) => {
    //If error send error and exit.
    if (err) return res.status(500).send(err);

    //Refresh page.
    res.redirect('back');
  });
});

module.exports = router;
