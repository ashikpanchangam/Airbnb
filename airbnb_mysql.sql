# Few poinst:
# 1. char(11) specified for primary keys in most of the tables because the 
#  the requirement doc says SSN format.
# 2. Host is same as user so just ID is mapped in host table

SET foreign_key_checks = 0;
drop database if exists airbnb_mysql;
create database airbnb_mysql;
use airbnb_mysql;

CREATE TABLE user (
	user_id char(11) not null,
    first_name varchar(25),
    last_name varchar(25),
    address varchar(30),
    city varchar(25),
    state varchar(25),
    zip_code varchar(10),
    phone_number varchar(12),
    dob date,
    email varchar(25),
    password varchar(25),
    profile_img_url varchar(50),
    credit_card_number char(16),
    credit_card_expiry date,
    credit_card_holder varchar(50),
    primary key (user_id)
);

CREATE TABLE bid (
	bid_id int not null auto_increment,
	bid_amount float(11,2),
    bid_time datetime not null,
	bid_property_id char(11),
    bid_user_id char(11),
    primary key (bid_id),
    constraint fk_bid_user_id foreign key(bid_user_id) references user (user_id) on delete cascade,
	constraint fk_bid_property_id foreign key(bid_property_id) references property (property_id) on delete cascade
);

CREATE TABLE property (
	property_id char(11) not null,
    category varchar(25),
	address varchar(30),
	city varchar(25),
	state varchar(25),
	zip_code varchar(10),
	quantity int,
	accommodates int,
	price FLOAT(11,2),
	description varchar(250),
    property_host_id char(11),
    primary key (property_id),
    constraint fk_property_host_id foreign key (property_host_id) references host (host_id) on delete cascade
);

CREATE TABLE host (
	host_id char(11) not null,
    host_user_id char(11) not null,
    primary key (host_id),
    constraint fk_host_user_id foreign key (host_user_id) references user (user_id) on delete cascade
);

CREATE TABLE trip (
	trip_id char(11) not null,
    trip_user_id char(11) not null,
    trip_host_id char(11) not null,
    trip_property_id char(11) not null,
    trip_bill_id char(11) not null,
    primary key (trip_id),
    constraint fk_trip_user_id foreign key (trip_user_id) references user (user_id) on delete cascade,
    constraint fk_trip_host_id foreign key (trip_host_id) references host (host_id) on delete cascade,
    constraint fk_trip_property_id foreign key (trip_property_id) references property (property_id) on delete cascade,
    constraint fk_trip_bill_id foreign key (trip_bill_id) references bill (bill_id) on delete cascade
);

CREATE TABLE review (
	review_id int not null auto_increment,
    reviews varchar (250),
    ratings float,
    review_property_id char(11) not null,
    primary key (review_id),
    constraint fk_review_property_id foreign key (review_property_id) references property (property_id) on delete cascade
);

CREATE TABLE bill (
	bill_id char(11),
    bill_total float(10,2),
    guests int,
    bill_date date,
    from_date date,
    to_date date,
    bill_property_id char(11) not null,
    bill_host_id char(11) not null,
    bill_user_id char(11) not null,
	primary key (bill_id),
    constraint fk_bill_user_id foreign key (bill_user_id) references user (user_id) on delete cascade,
    constraint fk_bill_host_id foreign key (bill_host_id) references host (host_id) on delete cascade,
    constraint fk_bill_property_id foreign key (bill_property_id) references property (property_id) on delete cascade
);

SET foreign_key_checks = 1;
