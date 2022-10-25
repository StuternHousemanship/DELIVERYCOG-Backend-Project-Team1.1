/* create users table */
CREATE TABLE users (
  id serial PRIMARY KEY, 
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  password_digest varchar(100),
  phone_number bigint NOT NULL,
  email varchar(150) NOT NULL,
  verification_code integer,
  is_verified Boolean NOT NULL default 'false',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);