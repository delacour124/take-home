const { Pool } = require('pg');
const { NULL } = require('sass');
const PG_URI = 'postgres://topzygez:MsoLfwVrqmEaC52-O7QFm5sbiO_N2GpL@ziggy.db.elephantsql.com/topzygez';

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



/*
CREATE TABLE appointment (
  appt_id BIGSERIAL PRIMARY KEY,
  doc_id integer NOT NULL,
  ptFirstName varchar NOT NULL,
  ptLastName varchar NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL, 
  kind varchar NOT NULL check (kind = 'Follow-up' or kind = 'New Patient'),
  created_at timestamp default CURRENT_TIMESTAMP
);

check (MINUTE(time) = '00' or MINUTE(time) = '15' or MINUTE(time) = '30' or MINUTE(time) = '45'),

CREATE TABLE doctor (
  doc_id BIGSERIAL PRIMARY KEY,
  firstName varchar NOT NULL,
  lastNAME varchar NOT NULL,
)
INSERT INTO appointments (doc_id, ptFirstName, ptLastName, date, time, kind) VALUES (1, 'ABC', 'E', '2022-08-22', '08:30:00', 'follow-up')
*/