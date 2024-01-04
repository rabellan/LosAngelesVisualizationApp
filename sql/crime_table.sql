-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/R6eiy7
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE IF EXISTS crime;

CREATE TABLE Crime (
    "crime_id" int   NOT NULL,
    "date_rptd" DATE   NOT NULL,
    "date_occ" DATE   NOT NULL,
    "time_occ" VARCHAR(4)   NOT NULL,
    "area" INT   NOT NULL,
    "area_name" VARCHAR(20)   NOT NULL,
    "crim_cd" INT   NOT NULL,
    "crim_cd_desc" VARCHAR(64)   NOT NULL,
    "vict_age" INT   NOT NULL,
    "vict_sex" VARCHAR(1)   NULL,
    "vict_descent" VARCHAR(1)   NULL,
    "location" VARCHAR(64)   NOT NULL,
    "lat" NUMERIC(7,4)   NOT NULL,
    "lon" NUMERIC(7,4)   NOT NULL,
    CONSTRAINT "pk_Crime" PRIMARY KEY (
        "crime_id"
     )
);

select * from crime;

-- UPDATE crime
-- SET
--   vict_descent = CASE WHEN vict_descent = '' THEN 'X' ELSE vict_descent END,
--   vict_sex = CASE WHEN vict_sex = '' THEN 'X' ELSE vict_sex END;

