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
    cb(null, id);
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

//Grabs information for specifc gallery by it's id.
exports.get = (id, cb) => {
  //Grab name for gallery.
  db.one('SELECT name FROM Galleries WHERE id = $1', id)
  .then(name => {
    //Grab Images for specific Gallery
    db.any('SELECT * FROM Images where gallery_id = $1 ORDER BY id DESC', id)
    .then(images => {
      //Send Name and Images back to controller.
      cb(null, name, images);
    })
    .catch(err => {
      console.log(err);
      cb(new error.InternalServerError());
    });//End of Error for image query.
  })
  .catch(err => {
    console.log(err);
    cb(new error.InternalServerError());
  });// End of error for gallery query.
};

//Deletes Gallery and Images by Gallery id;
exports.delete = (id, cb) => {
  db.none('DELETE FROM Images WHERE gallery_id = $1; DELETE FROM Galleries WHERE id = $1', id)
  .then(() => {
    cb(null);
  })
  .catch(err => {
    console.log(err);
    cb(new error.InternalServerError());
  });
};

//Update Gallery Name in database by it's id.
exports.update = (id, name, cb) => {
  db.none('UPDATE Galleries set name = $1 WHERE id = $2', [name, id])
  .then(() => {
    cb(null);
  })
  .catch(err => {
    console.log(err);
    cb(new error.InternalServerError());
  });
};
