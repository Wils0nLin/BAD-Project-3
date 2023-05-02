--appointment
SELECT * FROM cats;
SELECT * FROM cat_video WHERE cat_id=3
SELECT* FROM cat_image  WHERE cat_id=3
SELECT * FROM users;
SELECT * FROM adopt_forms;
SELECT * from home_visit;
UPDATE home_visit set is_select = 'true' where adopt_forms_id = 1 AND id = 3

--user apply an forms
INSERT INTO adopt_forms() VALUES ();

--volunteer check apply form
SELECT ..

--volunteer apply time for user
INSERT INTO home_visit () VALUES ();

--user select a time
UPDATE home_visit set home_visit.is_select = 'true' where id = (js{even.target.value})

--display result whit extra info
WITH t AS (
            SELECT 
                  cat_image.cat_id AS cat_id,
                  cat_image.id AS id, 
                  cat_image.c_image AS c_image 
            FROM cat_image 
            ORDER BY id
)
select 
      t.id AS img_id,
      t.c_image AS img,
      adopt_forms.id AS form_id,
      cats.c_name AS cat_name,
      adopt_status AS adopt_status
from cats 
JOIN adopt_forms ON cats.id = adopt_forms.cat_id
JOIN users ON adopt_forms.user_id = users.id 
JOIN t on t.cat_id = cats.id 
where adopt_forms.user_id = 2;


SELECT
      json_agg(cat_video.c_video) AS video,
      json_agg(cat_image.c_image) AS img,
      cats.c_name AS cat_name,
      cats.intro AS intro,
      cats.age AS age,
      cats.gender AS gender,
      cats.breed AS breed,
      cats.character AS characters,
      cats.cat_health AS cat_health,
      cats.food_habits AS food_habits   
from cats 
JOIN cat_image on cat_image.cat_id = cats.id 
JOIN cat_video on cat_video.cat_id = cats.id
where cats.id = ${}
GROUP BY    
      cats.c_name,
      cats.intro,
      cats.age,
      cats.gender,
      cats,breed,
      cats.character,
      cats.cat_health,
      cats.food_habits
      ;






SELECT c_name, intro , cat_image.c_image from cats join cat_image on cat_id = cats.id;
select * from volunteers;


SELECT cats.*, cats.id as cat_id FROM cats JOIN cat_image on cats.id = cat_image.cat_id where  cat_id = $1;



SELECT cats.* , cat_image.* , volunteers.* , cat_video.* FROM cats 
      JOIN cat_image ON cats.id = cat_image.cat_id 
      JOIN cat_video ON cats.id = cat_video.cat_id 
      JOIN volunteers ON cats.volunteer_id = volunteers.id;

SELECT * from cats 
join adopt_forms on adopt_forms.cat_id = cats.id
join cat_image on cat_image.cat_id = cats.id;

SELECT * FROM cat_video;
INSERT INTO adopt_forms(cat_id,user_id,adopt_status) VALUES (1,2,'pending');


SELECT
      json_agg(cat_video.c_video) AS video,
      json_agg(cat_image.c_image) AS img,
      cats.c_name AS cat_name,
      cats.intro AS intro,
      cats.id AS id,
      cats.age AS age,
      cats.gender AS gender,
      cats.breed AS breed,
      cats.character AS characters,
      cats.cat_health AS cat_health,
      cats.food_habits AS food_habits,   
      cats.volunteer_id AS V_id
from cats 
JOIN cat_image on cat_image.cat_id = cats.id 
LEFT JOIN cat_video on cat_video.cat_id = cats.id
where cats.volunteer_id = 2
GROUP BY    
      cats.c_name,
      cats.intro,
      cats.age,
      cats.gender,
      cats,breed,
      cats.character,
      cats.cat_health,
      cats.food_habits,
      cats.id,
      cats.volunteer_id
      ;


select * from users;
select * from volunteers;
select * from cats;

select * from form_images;

select * from events

UPDATE adopt_forms SET adopt_status = 'ACCEPT' WHERE id=${BodyObj.id}

INSERT INTO events ()

SELECT *, adopt_forms.id AS ad_id FROM adopt_forms
    INNER JOIN users
    ON users.id = adopt_forms.user_id
    INNER JOIN cats
    ON cats.id = adopt_forms.cat_id
    INNER JOIN cat_image
    ON cats.id = cat_image.cat_id 
    WHERE adopt_forms.id = 14

\





select *
from (
      select 
            cat_image.id AS img_id,
            cat_image.c_image AS img,
            adopt_forms.id AS form_id,
            cats.c_name AS cat_name,
            adopt_status AS adopt_status,
            ROW_NUMBER() over( partition by cats.c_name ORDER BY cats.c_name) n
      from cats 
      JOIN adopt_forms ON cats.id = adopt_forms.cat_id
      JOIN users ON adopt_forms.user_id = users.id 
      JOIN cat_image on cat_image.cat_id = cats.id 
      where adopt_forms.user_id = 2
) x
where n = 1
;


select * from(select 
            events.id,
            events.date,
            events.time,
            cats.age,
            cats.gender,
            cats.c_name,
            cat_image.c_image,
            cats.breed AS breed,
            events.event,
            ROW_NUMBER() over( partition by events.id ORDER BY events.id ) n
            from events
            join adopt_forms ON adopt_forms_id = adopt_forms.id
            join cats ON cats.id = adopt_forms.cat_id
            JOIN cat_image ON cat_image.cat_id = cats.id 
            WHERE adopt_forms_id = 15
            )x
            where n = 1;

          select * from adopt_forms where id =10
          select * from events where adopt_forms_id = 10

select * from cat_video;
          select * from adopt_forms 
          select * from events where adopt_forms_id = 10

         DELETE from adopt_forms where cat_id = 23

         select * from form_images   
          INSERT INTO form_images (adopt_forms_id,f_image) VALUES (10,'23')


ALTER TABLE cats ADD COLUMN is_shown boolean;

ALTER TABLE events ADD COLUMN event VARCHAR(20);

ALTER TABLE events RENAME COLUMN is_pass to is_select;

select * from(select 
            events.id,
            events.date,
            events.time,
            cats.age,
            cats.gender,
            cats.c_name,
            cat_image.c_image,
            cats.breed AS breed,
            events.event,
            ROW_NUMBER() over( partition by events.id ORDER BY events.id ) n
            from events
            join adopt_forms ON adopt_forms_id = adopt_forms.id
            join cats ON cats.id = adopt_forms.cat_id
            JOIN cat_image ON cat_image.cat_id = cats.id 
            WHERE adopt_forms_id =  7)x
            where n = 1
            
            SELECT * from events WHERE adopt_forms_id = 7


SELECT cats.* , cat_image.c_image , cat_video.c_video, volunteers.v_name, volunteers.v_email , volunteers.v_phone_number  FROM cats 
      JOIN cat_image ON cats.id = cat_image.cat_id 
      JOIN cat_video ON cats.id = cat_video.cat_id
      JOIN volunteers ON cats.volunteer_id = volunteers.id
      where cats.id = 70




DELETE from events;
DELETE from form_images;
DELETE from adopt_forms;
DELETE from cat_image;
DELETE from cat_video;
DELETE from cats;

Delete from volunteers;
Delete from users;

