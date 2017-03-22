const pgp = require('pg-promise')();
module.exports = pgp(process.env.DATABASE_URL || 'postgres://tajenglish@localhost:5432/plus1');
