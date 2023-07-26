-- USER TABLE
CREATE TABLE users (
  id CHAR(50) PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100),
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  country VARCHAR(20),
  city VARCHAR(20),
  is_google_auth BOOLEAN NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (username),
  UNIQUE (email)
);

-- ROLE TABLE
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- CREATE  USER_ROLES TABLE
CREATE TABLE users_roles (
  user_id CHAR(50),
  role_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- CREATE APPLICATIONS TABLE
CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  data JSON NOT NULL,
  status VARCHAR(100) NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- INSERT ROLES
INSERT INTO roles (name) VALUES
  ('ROLE_ADMIN'),
  ('ROLE_USER');

-- INSERT USER
INSERT INTO users (id, username, password, name, lastname, email, phone, country, city, is_google_auth)
VALUES (
  'c592534f-0d71-4f2c-8d3c-fb0e08101e29',
  'pygma',
  '$2a$10$kFuwF8dVEday5p60KOyZqukwkC8yl8G02VEgn1eewWYtyjsIKopHm',
  'Pygma',
  'Admin',
  'demo@pygma.com',
  '1234567890',
  'US',
  'New York City',
  false
);

--  ROLES TO USER
INSERT INTO users_roles (user_id, role_id)
VALUES ('c592534f-0d71-4f2c-8d3c-fb0e08101e29', 1);