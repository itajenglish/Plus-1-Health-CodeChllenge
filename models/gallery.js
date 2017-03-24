const db = require('../db/connectdb');
const error = require('throw.js');

/*
cb is the callback function passed down as a param when the model is called.
It takes two params error and the data returned from the db query.
example. cb(error, data)
*/

//Creates new gallery in database.
exports.create = (name, cb) => {
  db.one('INSERT INTO Galleries (name) VALUES ($1) returning id', name)
  .then((gallery) => {
    //Return New Gallary id to controller;
    const id = gallery.id;
    cb(null, id)
  })
  .catch(err => {
    console.log(err);
    //Return Error msg to controller
    cb(new error.InternalServerError());
  });
};

//Grabs all galleries from database.
exports.all = (cb) => {
  db.any('SELECT * FROM Galleries ORDER BY id DESC')
  .then(galleries => {
    cb(null, galleries);
  })
  .catch(err => {
    cb(new error.InternalServerError("Ohh oh something went wrong we will be back soon!"));
  });
};

//Update Gallery Name in database.
exports.update = (id, name, cb) => {
  db.none('UPDATE Galleries set name = $1 WHERE id = $2', name, id)
  .then(() => {
    console.log('Gallery Name Updated!');
  })
  .catch(err => {
    console.log(err);
    cb(new error.InternalServerError());
  });
};
