const pgp = require('pg-promise');
module.exports = pgp(process.env.DATABASE_URL || 'postges://tajenglish@localhost:5432/plus1');
