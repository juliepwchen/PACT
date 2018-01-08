Use openinterview

CREATE  TABLE users (
  username VARCHAR(45) NOT NULL ,
  password VARCHAR(45) NOT NULL ,
  enabled TINYINT NOT NULL DEFAULT 1 ,
  PRIMARY KEY (username));

CREATE TABLE user_roles (
  user_role_id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(45) NOT NULL,
  role varchar(45) NOT NULL,
  PRIMARY KEY (user_role_id),
  UNIQUE KEY uni_username_role (role,username),
  KEY fk_username_idx (username),
  CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES users (username));

INSERT INTO users(username,password,enabled)
VALUES ('testuser@gmail.com','testuser', true);
INSERT INTO users(username,password,enabled)
VALUES ('testuser2@gmail.com','testuser2', true);

INSERT INTO user_roles (username, role)
VALUES ('testuser@gmail.com', 'ROLE_USER');
INSERT INTO user_roles (username, role)
VALUES ('testuser@gmail.com', 'ROLE_ADMIN');
INSERT INTO user_roles (username, role)
VALUES ('testuser2@gmail.com', 'ROLE_USER');