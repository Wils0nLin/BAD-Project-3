
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
    income_id int ,
    FOREIGN KEY (income_id) REFERENCES income(id),
    home_size_id int ,
    FOREIGN KEY (home_size_id) REFERENCES home_size(id),
    
    u_name VARCHAR(20) not null,
    u_phone_number VARCHAR(8) not null,
    u_email VARCHAR(50) not null,
    u_address VARCHAR(100) not null,
    u_password text not null,
    u_username VARCHAR(20) not null,
    existed_pet boolean,
    pet_before boolean ,
    is_allergy boolean ,
    smoker boolean ,
    is_banned boolean DEFAULT '0',
    u_birth_date date ,
    knowledge text,
    future_plan text
);

CREATE TABLE volunteers(
    id serial primary key,
    v_name VARCHAR(20) not null,
    v_phone_number VARCHAR(8) not null,
    v_email VARCHAR(50) not null,
    v_address VARCHAR(100) not null,
    v_password text not null,
    v_username VARCHAR(20) not null,
    v_birth_date date not null
);
CREATE TABLE cats (
    id serial primary key,
    volunteer_id int not null,
    FOREIGN key (volunteer_id) REFERENCES volunteers(id),
    is_finish boolean DEFAULT false,
    intro text not null,
    age date not null,
    c_name VARCHAR(20) not null,
    gender VARCHAR(5) not null,
    breed VARCHAR(20) not null,
    character VARCHAR(20) not null,
    cat_health VARCHAR(50) not null,
    food_habits VARCHAR(200) not null

    is_shown boolean ,
);
CREATE TABLE cat_image (
    id serial primary key,
    cat_id int,
    FOREIGN key (cat_id) REFERENCES cats(id),
    c_image varchar(255)
);
CREATE TABLE cat_video (
    id serial primary key,
    cat_id int,
    FOREIGN key (cat_id) REFERENCES cats(id),
    c_video varchar(255)
);


CREATE TABLE adopt_forms(
    id serial primary key,
    cat_id int,
    FOREIGN key (cat_id) REFERENCES cats(id),
    user_id int,
    FOREIGN key (user_id) REFERENCES users(id),
    adopt_status varchar(50)
   
);

CREATE TABLE form_images(
    id serial primary key,
    adopt_forms_id int,
    FOREIGN key (adopt_forms_id) REFERENCES adopt_forms(id),
    f_image VARCHAR(255)
);
CREATE TABLE events(t
    id serial primary key,
    event VARCHAR(20),
    adopt_forms_id int,
    FOREIGN key (adopt_forms_id) REFERENCES adopt_forms(id),
    date date,
    time VARCHAR(10),
    is_select boolean, 
    is_show boolean DEFAULT '1'
);


insert into income (income_value) Values ('沒有收入'),('20000以下'),('60000以下'),('100000以上');

 insert into home_size (home_size) Values ('400呎以下'),('401-800呎'),('801呎以上');
 DROP TABLE events
