require('dotenv').config();
// require('dotenv').config({path: __dirname + '/.env'})
const { Pool } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';
const useVercelDb = process.env.USE_VERCEL_DB === 'true';

const localConnectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const vercelConnectionString = process.env.POSTGRES_URL;

// postgresql://api_user:password@localhost:5432/ecom
// ssl only use for production

const pool = new Pool({
  connectionString: useVercelDb ? vercelConnectionString : localConnectionString,
  ssl: useVercelDb
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

// Add this test function
async function testConnection() {
  try {
    const currentPostgresql = useVercelDb ? 'Vercel Postgres' : 'Local Postgres';
    const client = await pool.connect();
    console.log(`Successfully connected to ${currentPostgresql}!`);
    await client.query('SELECT NOW()');
    console.log('Query executed successfully!');
    client.release();
  } catch (err) {
    console.error(`Error connecting to ${currentPostgresql}:`, err);
  }
}

// Run the test
testConnection();

module.exports = {
  port: parseInt(process.env.PORT, 10),
  pool,
};
