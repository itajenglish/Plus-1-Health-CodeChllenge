const db = require('../db/connectdb');
const error = require('throw.js');

/*
cb is the callback function passed down as a param when the model is called.
It takes two params error and the data returned from the db query.
example. cb(error, data)
*/

//Creates new img in db after sucessful image upload to aws.
exports.create = (gallery_id, caption, image_url, cb) => {
  db.none('INSERT INTO Images (caption, image_url, gallery_id) VALUES ($1,$2,$3)',
  [caption, image_url, gallery_id])
  .then(() => {
    cb(null);
  })
  .catch(err => {
    console.log(err);
    cb(new error.InternalServerError());
  });
};

//Updates image caption by id in db.
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

//Deletes Image from db by id.
exports.delete = (id, cb) => {
  db.none('DELETE FROM images where id = $1', id)
  .then(() => {
    cb(null);
  })
  .catch(err => {
    console.log(err);
    cb(new error.InternalServerError());
  });
};
