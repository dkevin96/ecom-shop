require('dotenv').config();
// require('dotenv').config({path: __dirname + '/.env'})
const { Pool } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

const localConnectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const vercelConnectionString = process.env.POSTGRES_URL;

// postgresql://api_user:password@localhost:5432/ecom
// ssl only use for production

const pool = new Pool({
  connectionString: isProduction ? vercelConnectionString : localConnectionString,
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

module.exports = {
  port: parseInt(process.env.PORT, 10),
  pool,
};
