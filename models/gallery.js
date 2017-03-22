const db = require('../db/connectdb');
const error = require('throw.js');

exports.create = (name, cb) => {
  db.none('INSERT INTO Galleries name = $1', name)
  .then(() => {
    console.log('New Gallery Added!');
  })
  .catch(err => {
    console.log(err);
  });
};

exports.all = (cb) => {
  db.any('SELECT * FROM Galleries')
  .then(galleries => {
    cb(null, galleries);
  })
  .catch(err => {
    cb(new error.InternalServerError("Ohh oh something went wrong we will be back soon!"));
  });
};
