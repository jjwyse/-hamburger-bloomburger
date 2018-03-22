-- bloomburger_group table
DROP TABLE IF EXISTS bloomburger_group CASCADE;
CREATE TABLE bloomburger_group (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_dt TIMESTAMP NOT NULL DEFAULT now()
);
INSERT INTO bloomburger_group(name, description) VALUES ('all', 'All users in Bloomburger');

-- group_x_user
-- keeps track of which users are in which group via a lightweight xref table
DROP TABLE IF EXISTS group_x_user CASCADE;
CREATE TABLE group_x_user  (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL references bloomburger_user(id) ON DELETE CASCADE,
  group_id BIGINT NOT NULL references bloomburger_group(id) ON DELETE CASCADE
);
 
-- blog table
DROP TABLE IF EXISTS blog CASCADE;
CREATE TABLE blog (
  id BIGSERIAL PRIMARY KEY,
  created_by BIGINT NOT NULL references bloomburger_user(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  description TEXT,
  created_dt TIMESTAMP NOT NULL DEFAULT now()
);

-- user_x_blog
-- keeps track of which users can see which blogs.  this table ensures that if a user does _not_
-- see blogs for a group until after they join
DROP TABLE IF EXISTS user_x_blog CASCADE;
CREATE TABLE user_x_blog (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL references bloomburger_user(id) ON DELETE CASCADE,
  blog_id BIGINT NOT NULL references blog(id) ON DELETE CASCADE,
  has_read BOOL NOT NULL DEFAULT false
);