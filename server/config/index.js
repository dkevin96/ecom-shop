require('dotenv').config()
// require('dotenv').config({path: __dirname + '/.env'})
const {Pool} = require('pg')
const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// postgresql://api_user:password@localhost:5432/ecom

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  // ssl: {
  //   rejectUnauthorized: false
  //   }
})

module.exports = {
    port: parseInt(process.env.PORT, 10),
    pool
}