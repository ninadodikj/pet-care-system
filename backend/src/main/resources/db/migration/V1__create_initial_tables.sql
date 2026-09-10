create table users (
                       id bigserial primary key,
                       created_at timestamp not null,
                       updated_at timestamp not null,
                       name varchar(255) not null,
                       surname varchar(255) not null,
                       email varchar(255) not null unique,
                       username varchar(255) unique,
                       password varchar(255),
                       role varchar(50)
);
create table pets (
                      id bigserial primary key,
                      created_at timestamp not null,
                      updated_at timestamp not null,
                      name varchar(255) not null,
                      species varchar(255) not null,
                      breed varchar(255),
                      gender varchar(255),
                      birth_date date,
                      weight double precision,
                      owner_id bigint not null references users(id)
);
create table appointments (
                              id bigserial primary key,
                              created_at timestamp not null,
                              updated_at timestamp not null,
                              date date not null,
                              time time not null,
                              reason varchar(255) not null,
                              status varchar(50) not null,
                              notes varchar(255),
                              pet_id bigint not null references pets(id)
);
