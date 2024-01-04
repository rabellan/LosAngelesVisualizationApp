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
(select ST_SetSRID(ST_MakePoint(lon, lat), 4326) from business where dba_name 
 like 'MCDONALD%');
create view chip as
(select ST_SetSRID(ST_MakePoint(lon, lat), 4326) from business where business_name 
 like 'CHIPOTLE%');
create view walmart as
(select ST_SetSRID(ST_MakePoint(lon, lat), 4326) from business where business_name 
 like 'WALMART%');
create view starbucks as
(select ST_SetSRID(ST_MakePoint(lon, lat), 4326) from business where business_name 
 like 'STARBUCKS%');
create view walgreens as
(select ST_SetSRID(ST_MakePoint(lon, lat), 4326) from business where dba_name 
 like 'WALGREEN%');
create view crime_points as
(select *, ST_SetSRID(ST_MakePoint(lon, lat), 4326) from crime);

select * from mcd;
select * from chip;
select * from walmart;
select * from starbucks;
select * from crime_points;

DO $$ 
DECLARE
    row_record my_table%ROWTYPE;
BEGIN
    FOR row_record IN SELECT * FROM my_table LOOP
        -- Access individual columns of the current row
        RAISE NOTICE 'ID: %, Name: %, Age: %', row_record.id, row_record.name, row_record.age;
        
        -- Your logic using the individual columns goes here
    END LOOP;
END $$;