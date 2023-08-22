show databases;

use pygma_users;

show tables;
commit;
select * from users;
select * from roles;
select * from users_roles;
select * from applications;

describe applications;

delete from applications where username = 'pygma';
update applications set status = 'IN_PROGRESS' where username='IriesDavid';
drop table applications;

CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  data JSON NOT NULL,
  status VARCHAR(100) NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

select * from users
where email = 'Iries.Ibarguen@cun.edu.co';

delete from users_roles 
where user_id = '80bf06e5-457a-4bbb-9191-c1550a0444bb';

delete from users
where email = 'iries.ibarguen@cun.edu.co';

update users
set image_url = "https://lh3.googleusercontent.com/a/AAcHTtecTrMA5-sH6MG7TCkq9mg5YIolvAl5VApS7csP3q-sUr8=s96-c"
where email = 'Iries.Ibarguen@cun.edu.co';
