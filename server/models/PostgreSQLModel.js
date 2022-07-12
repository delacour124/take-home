const { Pool } = require('pg');
const PG_URI = '';

// create a new pool
const pool = new Pool({
  connectionString: PG_URI
})

// export query
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};