require("pg");
require("dotenv").config();

module.exports = {
  client: "pg",
  connection:
    process.env.HASURA_DATABASE_URL ||
    `postgres://postgres:@localhost:5432/postgres`,
  migrations: {
    directory: __dirname + "/db/migrations",
  },
};
