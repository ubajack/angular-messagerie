create table users(
    id int auto_increment not null primary key,
    pseudo varchar(16)
) engine = INNODB;

create table messages(
    id int auto_increment not null primary key,
    message varchar(256),
    date datetime,
    user_id int,
    foreign key (user_id) references users(id) on update cascade on delete cascade
) engine = INNODB;