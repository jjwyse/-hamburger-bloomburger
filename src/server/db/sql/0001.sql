-- bloomburger_user table
DROP TABLE IF EXISTS bloomburger_user CASCADE;
CREATE TABLE bloomburger_user (
  id BIGSERIAL PRIMARY KEY,
  email_address TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  sex TEXT NOT NULL,
  photo TEXT,
  bearer_token TEXT NOT NULL
  last_login TIMESTAMP NOT NULL DEFAULT now()
);