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
    "lat" NUMERIC(7,4)   NULL,
	"lon" NUMERIC(7,4)   NULL,
    CONSTRAINT "pk_McDonalds" PRIMARY KEY (
        "id"
     )
);

select * from mcdonalds;


/*
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
*/

/*
ALTER TABLE mcdonalds
ADD COLUMN lat NUMERIC(7,4),
ADD COLUMN lon NUMERIC(7,4);


MERGE INTO mcdonalds mcd
USING (select id, substring(split_part(location, ',', 1), 2) as lat from mcdonalds) lat
ON mcd.id = lat.id
WHEN MATCHED THEN
UPDATE SET lat = lat.lat::NUMERIC(7,4)
WHEN NOT MATCHED THEN
DO NOTHING;

MERGE INTO mcdonalds mcd
USING (select id, substring(split_part(location, ',', 2), 1, length(split_part(location, ',', 2)) - 1) as lon from mcdonalds) lon
ON mcd.id = lon.id
WHEN MATCHED THEN
UPDATE SET lon = lon.lon::NUMERIC(7,4)
WHEN NOT MATCHED THEN
DO NOTHING;

ALTER TABLE mcdonalds
DROP COLUMN location;
*/

/*
select id, substring(split_part(location, ',', 1), 2) from mcdonalds;
select id, substring(split_part(location, ',', 2), 1, length(split_part(location, ',', 2)) - 1) from mcdonalds;
*/


/*
PSQL COMMAND

psql -d la_crime_db -U postgres -c 
"\copy (select * from mcdonalds) TO 'C:\Users\leon1\OneDrive\bootcamp_hw\group_projects\LosAngelesVisualizationApp\static\resources\mcdonalds_clean.csv' 
WITH DELIMITER ',' CSV HEADER;"
*/



