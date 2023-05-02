INSERT INTO users (
    id,
    income_id,
    home_size_id,
    name,
    phone_number,
    email,
    address,
    username,
    existed_pet,
    pet_before,
    allergy_or_not,
    smoker,
    is_banned,
    birth_date,
    knowledge,
    future_plan,
    password
  )
VALUES (
    id:integer,
    income_id:integer,
    home_size_id:integer,
    'name:character varying',
    'phone_number:character varying',
    'email:character varying',
    'address:character varying',
    'username:character varying',
    existed_pet:boolean,
    pet_before:boolean,
    allergy_or_not:boolean,
    smoker:boolean,
    is_banned:boolean,
    'birth_date:date',
    'knowledge:text',
    'future_plan:text',
    'password:text'
  );CREATE DATABASE cat_platform;
\c cat_platform

CREATE TABLE income (
    id serial primary key , 
    income_value varchar(20)
);
CREATE TABLE home_size (
    id serial primary key , 
    home_size VARCHAR(20)
);
CREATE TABLE users(
    id serial primary key,
    income_id int not null,
    FOREIGN KEY (income_id) REFERENCES income(id),
    home_size_id int ,
    FOREIGN KEY (home_size_id) REFERENCES home_size(id),
    
    names VARCHAR(20) not null,
    phone_number VARCHAR(8) not null,
    email VARCHAR(50) not null,
    address VARCHAR(100) not null,
    password VARCHAR(12) not null,
    username VARCHAR(20) not null,
    existed_pet boolean,
    pet_before boolean ,
    allergy_or_not boolean ,
    smoker boolean ,
    is_banned boolean DEFAULT '0',
    birth_date date ,
    knowledge text,
    future_plan text
);

CREATE TABLE volunteer(
    id serial primary key,
    names VARCHAR(20) not null,
    phone_number VARCHAR(8) not null,
    email VARCHAR(50) not null,
    address VARCHAR(100) not null,
    password VARCHAR(12) not null,
    username VARCHAR(20) not null,
    birth_date date not null
);
CREATE TABLE cats (
    id serial primary key,
    volunteer_id int not null,
    FOREIGN key (volunteer_id) REFERENCES volunteer(id),
    is_finish boolean DEFAULT false,
    intro text not null,
    age date not null,
    names VARCHAR(20) not null,
    gender VARCHAR(5) not null,
    breed VARCHAR(20) not null,
    character VARCHAR(20) not null,
    cat_health VARCHAR(50) not null,
    food_habits VARCHAR(200) not null
);
CREATE TABLE cat_image (
    id serial primary key,
    cat_id int,
    FOREIGN key (cat_id) REFERENCES cat(id),
    image varchar(255)
);
CREATE TABLE cat_video (
    id serial primary key,
    cat_id int,
    FOREIGN key (cat_id) REFERENCES cat(id),
    video varchar(255)
);
CREATE TABLE cat_event(
    id serial primary key,
    cat_id int ,
    FOREIGN key (cat_id) REFERENCES cat(id),
    title varchar(20) not null,
    data date
);
CREATE TABLE adopt_status(
    id serial primary key,
    status VARCHAR(30)
);
CREATE TABLE adopt_forms(
    id serial primary key,
    cat_id int,
    FOREIGN key (cat_id) REFERENCES cat(id),
    users_id int,
    FOREIGN key (users_id) REFERENCES users(id),
    adopt_status varchar(10),
);

CREATE TABLE form_images(
    id serial primary key,
    adopt_forms_id int,
    FOREIGN key (adopt_forms_id) REFERENCES adopt_forms(id),
    image VARCHAR(255)
);
CREATE TABLE home_visit(
    id serial primary key,
    adopt_forms_id int,
    FOREIGN key (adopt_forms_id) REFERENCES adopt_forms(id),
    date date,
    pass_or_not boolean 
);

 SELECT * from income;

 insert into income (income_value) Values ('沒有收入'),('20000以下'),('60000以下'),('100000以上');

 insert into home_size (home_size) Values ('400呎以下'),('401-800呎'),('801呎以上');

 alter table users rename column names to name;

 SELECT * from users;

 alter  table users drop column password;

 alter table users  add column password text;
 
 alter  table volunteer drop column password;

 alter table volunteer  add column password text;

insert into income (income_value) Values ('沒有收入'),('20000以下'),('60000以下'),('100000以上');

 insert into home_size (home_size) Values ('400呎以下'),('401-800呎'),('801呎以上');



ALTER table adopt_forms ADD column adopt_status VARCHAR(10);




SELECT cat.name AS cat_name  FROM users 
      INNER JOIN adopt_forms
        ON users.id = adopt_forms.users_id
      INNER JOIN cat
        ON cat.id = adopt_forms.cat_id
      WHERE users.name = 'Lin Ka Heung'


WITH temp AS (
      SELECT MIN(id) AS id, cat_id FROM cat_image GROUP BY cat_id
  )
  SELECT cats.*, cat_image.id AS c_image_id, cat_image.c_image FROM cats 
  LEFT JOIN temp ON cats.id = temp.cat_id
  INNER JOIN cat_image ON temp.id = cat_image.id;


SELECT * from events where adopt_forms_id = 33 AND is_select = 'true' ORDER BY date
SELECT * from adopt_forms WHERE id=33 

