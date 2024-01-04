/*
create extension cube;
create extension earthdistance;

drop view if exists mcd;
*/

create view mcd as
(select * from business where dba_name like 'MCDONALD%');

select * from mcd;