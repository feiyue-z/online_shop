CREATE SCHEMA gateway;

create table gateway.request
(
    id         int           not null auto_increment,
    ip_address varchar(64)   not null,
    call_time  timestamp     not null,
    path       varchar(2048) null,
    primary key (id)
);






