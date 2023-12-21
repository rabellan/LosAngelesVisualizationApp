-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/R6eiy7
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE IF EXISTS mcdonalds;

CREATE TABLE McDonalds (
    "id" SERIAL   NOT NULL,
    "location_num" VARCHAR(20)   NOT NULL,
    "business_name" VARCHAR(64)   NOT NULL,
    "dba_name" VARCHAR(64)   NOT NULL,
    "street_address" VARCHAR(64)   NOT NULL,
    "city" VARCHAR(64)   NOT NULL,
    "zipcode" VARCHAR(10)   NOT NULL,
    "location_desc" VARCHAR(64)   NOT NULL,
    "location" VARCHAR(64)   NULL,
    CONSTRAINT "pk_McDonalds" PRIMARY KEY (
        "id"
     )
);

select * from mcdonalds;