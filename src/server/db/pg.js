const client = require('knex')({
  client: 'pg',
  connection: `postgres://${process.env.BLOOMBURGER_DB_USER}:${process.env.BLOOMBURGER_DB_PASSWORD}@${process.env.BLOOMBURGER_DB_HOST}:${process.env.BLOOMBURGER_DB_PORT}/bloomburger?connect_timeout=10&application_name=bloomburger`,
  searchPath: 'knex,public',
});

export default client;
