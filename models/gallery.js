const db = require('../db/connectdb');
const error = require('throw.js');

//Creates new gallery in database.
exports.create = (name, cb) => {
  db.none('INSERT INTO Galleries name = $1', name)
  .then(() => {
    console.log('New Gallery Added!');
  })
  .catch(err => {
    console.log(err);
  });
};

//Grabs all galleries from database.
exports.all = (cb) => {
  db.any('SELECT * FROM Galleries')
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
