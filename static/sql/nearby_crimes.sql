/*
create extension postgis;

drop view if exists mcd;
drop view if exists chip;
drop view if exists walmart;
drop view if exists starbucks;
drop view if exists walgreens;
drop view if exists crime_points;

*/

create view mcd as
(select ST_SetSRID(ST_MakePoint(lon, lat), 4326)::geography as pt from business where dba_name 
 like 'MCDONALD%');
create view chip as
(select ST_SetSRID(ST_MakePoint(lon, lat), 4326)::geography as pt from business where business_name 
 like 'CHIPOTLE%');
create view walmart as
(select ST_SetSRID(ST_MakePoint(lon, lat), 4326)::geography as pt from business where business_name 
 like 'WALMART%');
create view starbucks as
(select ST_SetSRID(ST_MakePoint(lon, lat), 4326)::geography as pt from business where business_name 
 like 'STARBUCKS%');
create view walgreens as
(select ST_SetSRID(ST_MakePoint(lon, lat), 4326)::geography as pt from business where dba_name 
 like 'WALGREEN%');
create view crime_points as
(select *, ST_SetSRID(ST_MakePoint(lon, lat), 4326)::geography as pt from crime);

select * from mcd;
select * from chip;
select * from walmart;
select * from starbucks;
select * from walgreens;
select * from crime_points;


/*
DROP TABLE IF EXISTS mcd_crimes; 

CREATE TABLE mcd_crimes (
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
    CONSTRAINT "pk_mcd_crimes" PRIMARY KEY (
        "crime_id"
     )
);

DO $$ 
DECLARE
    crime_row crime_points%ROWTYPE;
	business_row RECORD;
BEGIN
    FOR crime_row IN select * from crime_points LOOP
		FOR business_row IN select * from mcd LOOP
			IF ST_Distance(crime_row.pt, business_row.pt) < 1000 THEN
				/*RAISE NOTICE '%', ST_Distance(crime_row.pt, business_row.pt);*/
				INSERT INTO mcd_crimes VALUES (crime_row.crime_id, crime_row.date_rptd, crime_row.date_occ,
											  crime_row.time_occ, crime_row.area, crime_row.area_name,
											  crime_row.crim_cd, crime_row.crim_cd_desc, crime_row.vict_age,
											  crime_row.vict_sex, crime_row.vict_descent, crime_row.location,
											  crime_row.lat, crime_row.lon);
				EXIT;
			END IF;
		END LOOP;
    END LOOP;
END $$;

select * from mcd_crimes;

psql -d la_crime_db -U postgres -c "\copy (select * from mcd_crimes) TO 'C:\Users\leon1\OneDrive\bootcamp_hw\group_projects\LosAngelesVisualizationApp\static\resources\mcd_crimes.csv' WITH DELIMITER ',' CSV HEADER;"
*/


/*
DROP TABLE IF EXISTS chip_crimes; 

CREATE TABLE chip_crimes (
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
    CONSTRAINT "pk_chipotle_crimes" PRIMARY KEY (
        "crime_id"
     )
);

DO $$ 
DECLARE
    crime_row crime_points%ROWTYPE;
	business_row RECORD;
BEGIN
    FOR crime_row IN select * from crime_points LOOP
		FOR business_row IN select * from chip LOOP
			IF ST_Distance(crime_row.pt, business_row.pt) < 1000 THEN
				/*RAISE NOTICE '%', ST_Distance(crime_row.pt, business_row.pt);*/
				INSERT INTO chip_crimes VALUES (crime_row.crime_id, crime_row.date_rptd, crime_row.date_occ,
											  crime_row.time_occ, crime_row.area, crime_row.area_name,
											  crime_row.crim_cd, crime_row.crim_cd_desc, crime_row.vict_age,
											  crime_row.vict_sex, crime_row.vict_descent, crime_row.location,
											  crime_row.lat, crime_row.lon);
				EXIT;
			END IF;
		END LOOP;
    END LOOP;
END $$;

select * from chip_crimes;


psql -d la_crime_db -U postgres -c "\copy (select * from chip_crimes) TO 'C:\Users\leon1\OneDrive\bootcamp_hw\group_projects\LosAngelesVisualizationApp\static\resources\chip_crimes.csv' WITH DELIMITER ',' CSV HEADER;"
*/


/*
DROP TABLE IF EXISTS walmart_crimes; 

CREATE TABLE walmart_crimes (
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
    CONSTRAINT "pk_walmart_crimes" PRIMARY KEY (
        "crime_id"
     )
);

DO $$ 
DECLARE
    crime_row crime_points%ROWTYPE;
	business_row RECORD;
BEGIN
    FOR crime_row IN select * from crime_points LOOP
		FOR business_row IN select * from walmart LOOP
			IF ST_Distance(crime_row.pt, business_row.pt) < 1000 THEN
				/*RAISE NOTICE '%', ST_Distance(crime_row.pt, business_row.pt);*/
				INSERT INTO walmart_crimes VALUES (crime_row.crime_id, crime_row.date_rptd, crime_row.date_occ,
											  crime_row.time_occ, crime_row.area, crime_row.area_name,
											  crime_row.crim_cd, crime_row.crim_cd_desc, crime_row.vict_age,
											  crime_row.vict_sex, crime_row.vict_descent, crime_row.location,
											  crime_row.lat, crime_row.lon);
				EXIT;
			END IF;
		END LOOP;
    END LOOP;
END $$;

select * from walmart_crimes;


psql -d la_crime_db -U postgres -c "\copy (select * from walmart_crimes) TO 'C:\Users\leon1\OneDrive\bootcamp_hw\group_projects\LosAngelesVisualizationApp\static\resources\walmart_crimes.csv' WITH DELIMITER ',' CSV HEADER;"
*/


/*
DROP TABLE IF EXISTS starbucks_crimes; 

CREATE TABLE starbucks_crimes (
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
    CONSTRAINT "pk_starbucks_crimes" PRIMARY KEY (
        "crime_id"
     )
);

DO $$ 
DECLARE
    crime_row crime_points%ROWTYPE;
	business_row RECORD;
BEGIN
    FOR crime_row IN select * from crime_points LOOP
		FOR business_row IN select * from starbucks LOOP
			IF ST_Distance(crime_row.pt, business_row.pt) < 1000 THEN
				/*RAISE NOTICE '%', ST_Distance(crime_row.pt, business_row.pt);*/
				INSERT INTO starbucks_crimes VALUES (crime_row.crime_id, crime_row.date_rptd, crime_row.date_occ,
											  crime_row.time_occ, crime_row.area, crime_row.area_name,
											  crime_row.crim_cd, crime_row.crim_cd_desc, crime_row.vict_age,
											  crime_row.vict_sex, crime_row.vict_descent, crime_row.location,
											  crime_row.lat, crime_row.lon);
				EXIT;
			END IF;
		END LOOP;
    END LOOP;
END $$;

select * from starbucks_crimes;


psql -d la_crime_db -U postgres -c "\copy (select * from starbucks_crimes) TO 'C:\Users\leon1\OneDrive\bootcamp_hw\group_projects\LosAngelesVisualizationApp\static\resources\starbucks_crimes.csv' WITH DELIMITER ',' CSV HEADER;"
*/


/*
DROP TABLE IF EXISTS walgreens_crimes; 

CREATE TABLE walgreens_crimes (
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
    CONSTRAINT "pk_walgreens_crimes" PRIMARY KEY (
        "crime_id"
     )
);

DO $$ 
DECLARE
    crime_row crime_points%ROWTYPE;
	business_row RECORD;
BEGIN
    FOR crime_row IN select * from crime_points LOOP
		FOR business_row IN select * from walgreens LOOP
			IF ST_Distance(crime_row.pt, business_row.pt) < 1000 THEN
				/*RAISE NOTICE '%', ST_Distance(crime_row.pt, business_row.pt);*/
				INSERT INTO walgreens_crimes VALUES (crime_row.crime_id, crime_row.date_rptd, crime_row.date_occ,
											  crime_row.time_occ, crime_row.area, crime_row.area_name,
											  crime_row.crim_cd, crime_row.crim_cd_desc, crime_row.vict_age,
											  crime_row.vict_sex, crime_row.vict_descent, crime_row.location,
											  crime_row.lat, crime_row.lon);
				EXIT;
			END IF;
		END LOOP;
    END LOOP;
END $$;

select * from walgreens_crimes;


psql -d la_crime_db -U postgres -c "\copy (select * from walgreens_crimes) TO 'C:\Users\leon1\OneDrive\bootcamp_hw\group_projects\LosAngelesVisualizationApp\static\resources\walgreens_crimes.csv' WITH DELIMITER ',' CSV HEADER;"
*/


/*
CREATE OR REPLACE FUNCTION find_crimes(
    source_table text,
	dest_table text
) 
RETURNS VOID AS
$$ 
DECLARE
    crime_row crime_points%ROWTYPE;
	business_row RECORD;
BEGIN
    FOR crime_row IN select * from crime_points LOOP
		FOR business_row IN EXECUTE 'select * from ' || source_table LOOP
			IF ST_Distance(crime_row.pt, business_row.pt) < 1000 THEN
				/*RAISE NOTICE '%', ST_Distance(crime_row.pt, business_row.pt);*/
				EXECUTE 'INSERT INTO ' || dest_table || ' VALUES (crime_row.crime_id, crime_row.date_rptd, crime_row.date_occ,
											  crime_row.time_occ, crime_row.area, crime_row.area_name,
											  crime_row.crim_cd, crime_row.crim_cd_desc, crime_row.vict_age,
											  crime_row.vict_sex, crime_row.vict_descent, crime_row.location,
											  crime_row.lat, crime_row.lon)';
				EXIT;
			END IF;
		END LOOP;
    END LOOP;
END;
$$
LANGUAGE plpgsql;

select find_crimes('mcd', 'mcd_crimes');
*/