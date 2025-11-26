import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

// Configure the knex with postgres
const pg = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    ssl: process.env.USE_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
});

// module.exports = pg;

// making default export when migrating.
export default pg;
