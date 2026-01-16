/* =========================================================
   DATABASE
   ========================================================= */
CREATE DATABASE IF NOT EXISTS falero
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE falero;

/* =========================================================
   SHARED KERNEL — GEOGRAPHY
   ========================================================= */
CREATE TABLE state (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  uf CHAR(2) NOT NULL UNIQUE
);

CREATE TABLE city (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  CONSTRAINT fk_city_state
    FOREIGN KEY (state_id) REFERENCES state(id)
);

CREATE TABLE neighborhood (
  id INT AUTO_INCREMENT PRIMARY KEY,
  city_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  CONSTRAINT fk_neighborhood_city
    FOREIGN KEY (city_id) REFERENCES city(id)
);

/* =========================================================
   IDENTITY — USER (PERSON)
   ========================================================= */
CREATE TABLE user (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(80) NOT NULL,
  rg VARCHAR(10) NOT NULL,
  cpf CHAR(11) UNIQUE,
  gender ENUM('M','F') NOT NULL,
  email VARCHAR(80) UNIQUE,
  phone VARCHAR(20),

  -- Address (Value Object)
  address_street VARCHAR(100),
  address_number VARCHAR(10),
  address_complement VARCHAR(50),
  address_zip_code CHAR(8),
  neighborhood_id INT,
  city_id INT,

  CONSTRAINT fk_user_neighborhood
    FOREIGN KEY (neighborhood_id) REFERENCES neighborhood(id),
  CONSTRAINT fk_user_city
    FOREIGN KEY (city_id) REFERENCES city(id)
);

/* =========================================================
   UNIT — LIBRARY / SCHOOL
   ========================================================= */
CREATE TABLE unit (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  phone VARCHAR(20),

  -- Address (Value Object)
  address_street VARCHAR(100),
  address_number VARCHAR(10),
  address_complement VARCHAR(50),
  address_zip_code CHAR(8),
  neighborhood_id INT NOT NULL,
  city_id INT NOT NULL,

  CONSTRAINT fk_unit_neighborhood
    FOREIGN KEY (neighborhood_id) REFERENCES neighborhood(id),
  CONSTRAINT fk_unit_city
    FOREIGN KEY (city_id) REFERENCES city(id)
);

/* =========================================================
   ACCESS CONTROL — RBAC
   ========================================================= */
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(30) NOT NULL
);

CREATE TABLE permission (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE role_permission (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  CONSTRAINT fk_role_permission_role
    FOREIGN KEY (role_id) REFERENCES role(id),
  CONSTRAINT fk_role_permission_permission
    FOREIGN KEY (permission_id) REFERENCES permission(id)
);

CREATE TABLE login (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  role_id INT NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at DATETIME NOT NULL,

  CONSTRAINT fk_login_user
    FOREIGN KEY (user_id) REFERENCES user(id),
  CONSTRAINT fk_login_role
    FOREIGN KEY (role_id) REFERENCES role(id)
);

/* =========================================================
   CATALOG — BIBLIOGRAPHIC DOMAIN
   ========================================================= */
CREATE TABLE author (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL
);

CREATE TABLE genre (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(50)
);

CREATE TABLE language (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(50)
);

CREATE TABLE work_type (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(30)
);

CREATE TABLE publisher (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  address VARCHAR(100),
  phone VARCHAR(20),
  website VARCHAR(150),
  email VARCHAR(100)
);

CREATE TABLE location (
  id INT AUTO_INCREMENT PRIMARY KEY,
  shelf VARCHAR(10)
);

CREATE TABLE work (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  isbn VARCHAR(17) UNIQUE,
  publication_year YEAR,
  edition INT,
  pages INT,
  collection VARCHAR(60),
  description TEXT,

  genre_id INT,
  language_id INT,
  work_type_id INT,
  publisher_id INT,
  location_id INT,

  CONSTRAINT fk_work_genre
    FOREIGN KEY (genre_id) REFERENCES genre(id),
  CONSTRAINT fk_work_language
    FOREIGN KEY (language_id) REFERENCES language(id),
  CONSTRAINT fk_work_type
    FOREIGN KEY (work_type_id) REFERENCES work_type(id),
  CONSTRAINT fk_work_publisher
    FOREIGN KEY (publisher_id) REFERENCES publisher(id),
  CONSTRAINT fk_work_location
    FOREIGN KEY (location_id) REFERENCES location(id)
);

CREATE TABLE work_author (
  work_id INT NOT NULL,
  author_id INT NOT NULL,
  PRIMARY KEY (work_id, author_id),
  CONSTRAINT fk_work_author_work
    FOREIGN KEY (work_id) REFERENCES work(id),
  CONSTRAINT fk_work_author_author
    FOREIGN KEY (author_id) REFERENCES author(id)
);

/* =========================================================
   INVENTORY — PHYSICAL COPIES
   ========================================================= */
CREATE TABLE work_copy (
  id INT AUTO_INCREMENT PRIMARY KEY,
  work_id INT NOT NULL,
  unit_id INT NOT NULL,
  acquisition_date DATE,
  notes VARCHAR(150),
  status ENUM('AVAILABLE','BORROWED','MAINTENANCE') NOT NULL,

  CONSTRAINT fk_work_copy_work
    FOREIGN KEY (work_id) REFERENCES work(id),
  CONSTRAINT fk_work_copy_unit
    FOREIGN KEY (unit_id) REFERENCES unit(id)
);

CREATE TABLE maintenance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  work_copy_id INT NOT NULL,
  maintenance_date DATETIME,
  reason VARCHAR(100),

  CONSTRAINT fk_maintenance_work_copy
    FOREIGN KEY (work_copy_id) REFERENCES work_copy(id)
);

/* =========================================================
   CIRCULATION — LOANS & RESERVATIONS
   ========================================================= */
CREATE TABLE loan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  unit_id INT NOT NULL,
  loan_date DATETIME NOT NULL,

  CONSTRAINT fk_loan_user
    FOREIGN KEY (user_id) REFERENCES user(id),
  CONSTRAINT fk_loan_unit
    FOREIGN KEY (unit_id) REFERENCES unit(id)
);

CREATE TABLE loan_item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  loan_id INT NOT NULL,
  work_copy_id INT NOT NULL,
  return_date DATETIME,

  CONSTRAINT fk_loan_item_loan
    FOREIGN KEY (loan_id) REFERENCES loan(id),
  CONSTRAINT fk_loan_item_work_copy
    FOREIGN KEY (work_copy_id) REFERENCES work_copy(id)
);

CREATE TABLE reservation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  work_copy_id INT NOT NULL,
  reservation_date DATETIME,
  status ENUM('ACTIVE','CANCELLED','FULFILLED') NOT NULL,

  CONSTRAINT fk_reservation_user
    FOREIGN KEY (user_id) REFERENCES user(id),
  CONSTRAINT fk_reservation_work_copy
    FOREIGN KEY (work_copy_id) REFERENCES work_copy(id)
);

/* =========================================================
   COMMUNICATION — CONTACT / SUPPORT
   ========================================================= */
CREATE TABLE contact_message (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_name VARCHAR(60),
  sender_email VARCHAR(60),
  message VARCHAR(255),
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  replied BOOLEAN DEFAULT FALSE,
  reply_date TIMESTAMP NULL,
  reply TEXT
);
