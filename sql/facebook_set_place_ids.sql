create
or replace function pg_temp.generate_query_from_place_description(description text) returns text as $ $
select
  '%' || split_part($ 1, ', ', 1) || '%' || split_part($ 1, ', ', 2) || '%' $ $ language sql;

select
  pg_temp.generate_query_from_place_description(description)
from
  places;

with places_matching_facebook_addresses as (
  -- Any generic query which returns rowid and corresponding calculated values
  select
    t1.place_id,
    t1.description,
    t2.email,
    t2.address
  from
    places as t1
    join facebook as t2 on t2.address ilike generate_query_from_place_description(t1.description)
)
update
  facebook
set
  place_id = places_matching_facebook_addresses.place_id
from
  places_matching_facebook_addresses
where
  facebook.email = places_matching_facebook_addresses.email
  and facebook.place_id is null;