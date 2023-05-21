-- USER TABLE
CREATE TABLE users (
  id  CHAR(50) PRIMARY KEY,
  username  VARCHAR(100) NOT NULL,
  password  VARCHAR(100) NOT NULL,
  name  VARCHAR(100) NOT NULL,
  lastname  VARCHAR(100),
  email  VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  UNIQUE (username),
  UNIQUE (email)
);

-- ROLE TABLE
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(100) NOT NULL
);

-- CREATE  USER_ROLES TABLE
CREATE TABLE user_roles (
  user_id  CHAR(50),
  role_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);

-- INSERT ROLES
INSERT INTO roles (name) VALUES
  ('ROLE_ADMIN'),
  ('ROLE_USER');

-- INSERT USER
INSERT INTO users (id, username, password, name, lastname, email, phone)
VALUES (
  'c592534f-0d71-4f2c-8d3c-fb0e08101e29',
  'david.gomelo',
  'password123',
  'David',
  'Ibarguen',
  'david.ibarguen@gmail.com',
  '1234567890'
);

--  ROLES TO USER
INSERT INTO user_roles (user_id, role_id)
SELECT 'c592534f-0d71-4f2c-8d3c-fb0e08101e29', id
FROM roles
WHERE name IN ('ROLE_ADMIN', 'ROLE_USER');
