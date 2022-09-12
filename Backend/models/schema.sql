DROP DATABASE books;

CREATE DATABASE books;

use books;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- - Create a table called users in the database
CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

-- Create a table called books in the database
CREATE TABLE book (
    id INT AUTO_INCREMENT NOT NULL,
    bookName VARCHAR(255),
    img VARCHAR(255),
    description VARCHAR(255),
    price INT,
        user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),

    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

-- - Create a table called permissions
CREATE TABLE permissions(
    id int auto_increment NOT NULL,
    permission varchar (255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    primary key (id)
);

-- - Create a table called roles_permissions
CREATE TABLE roles_permissions(
    id int auto_increment NOT NULL,
    permission_id INT,
    role_id INT,
    foreign key (role_id) references roles(id),
    foreign key (permission_id) references permissions(id),
    is_deleted TINYINT DEFAULT 0,
    primary key (id)
);

-- - Create a table called comments
CREATE TABLE comments(
    id int auto_increment NOT NULL,
    comment VARCHAR(255),
    book_id INT,
    user_id INT,
    foreign key (user_id) references users(id),
    foreign key (book_id) references book(id),
    is_deleted TINYINT DEFAULT 0,
    primary key (id)
);

-- - Create a table called favorite in the database
CREATE TABLE favorite(
    id INT AUTO_INCREMENT NOT NULL,
    book_id INT,
    user_id INT,
    foreign key (user_id) references users(id),
    foreign key (book_id) references book(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

-- - Create a table called cart in the database
CREATE TABLE cart(
    id int auto_increment NOT NULL,
    book_id INT,
    user_id INT,
    amount INT DEFAULT 1,
    foreign key (book_id) references book(id),
    foreign key (user_id) references users(id),
    is_deleted TINYINT DEFAULT 0,
    primary key (id)
);