-- Filter to records from users where there are duplicates. Of the two records, the one with the nonnull iss is kept.
begin;

update
  facebook
set
  place_id = places.place_id
from
  places
where
  facebook.place_id is null
  and facebook.address ilike '%' || split_part(places.description, ', ', 1) || '%' || split_part(places.description, ', ', 2) || '%'
select
  *
from
  place_id;

rollback;