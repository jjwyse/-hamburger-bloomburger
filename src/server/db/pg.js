const client = require('knex')({
  client: 'pg',
  connection: `postgres://${process.env.bloomburger_DB_USER}:${process.env.bloomburger_DB_PASSWORD}@${process.env.bloomburger_DB_HOST}:${process.env.bloomburger_DB_PORT}/bloomburger?connect_timeout=10&application_name=bloomburger`,
  searchPath: 'knex,public',
});

export default client;
