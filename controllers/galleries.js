const express = require('express');
const router = express.Router();

//Renders Page To Add NEW Gallery
router.get('/new', (req, res, next) => {
  res.render('gallery/new');
})



module.exports = router;
