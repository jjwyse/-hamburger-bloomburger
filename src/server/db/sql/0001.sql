-- bloomburger_user table
DROP TABLE IF EXISTS bloomburger_user CASCADE;
CREATE TABLE bloomburger_user (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  photo TEXT,
  access_token TEXT NOT NULL,
  last_login TIMESTAMP NOT NULL DEFAULT now()
);