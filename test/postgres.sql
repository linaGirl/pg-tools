
DROP SCHEMA IF EXISTS related_test_postgres CASCADE;
CREATE SCHEMA related_test_postgres;

CREATE TABLE related_test_postgres.country (
id serial NOT NULL
, code character varying(3)
, name character varying(200)
, CONSTRAINT "pk_country" PRIMARY KEY (id)
, CONSTRAINT "unique_country_code" UNIQUE(code)
);

INSERT INTO related_test_postgres.country VALUES (1, 'IND', 'India');
INSERT INTO related_test_postgres.country VALUES (2, 'US', 'USA');
INSERT INTO related_test_postgres.country VALUES (3, 'AUS', 'Australia');
