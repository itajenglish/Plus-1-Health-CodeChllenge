const db = require('../db/connectdb');
const error = require('throw.js');

/*
cb is the callback function passed down as a param when the model is called.
It takes two params error and the data returned from the db query.
example. cb(error, data)
*/

exports.update = (id, caption, cb) => {
  db.none('UPDATE images SET (caption) = ($1) WHERE id = $2', [caption, id])
  .then(() =>{
    cb(null);
  })
  .catch(err => {
    console.log(err);
    cb(new error.InternalServerError());
  });
};
