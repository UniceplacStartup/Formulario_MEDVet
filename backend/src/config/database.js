const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT, 
    database: process.env.DATABASE
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
