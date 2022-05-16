-- List all places from the database. Return it as a list of items that contains place description, place lat, place lng, and place people
-- Place people is a list of users that are associated with the place
-- Each user has a id, name, and avatar_url
select
  places.description,
  places.lat,
  places.lng,
  (
    select
      json_agg(
        json_build_object(
          'id',
          users.id,
          'name',
          users.name,
          'avatar_url',
          users.avatar_url
        )
      )
    from
      users
      inner join user_responses on users.user_response_id = user_responses.user_response_id
    where
      user_responses.place_id = places.place_id
  ) as people
from
  places;

CREATE
OR REPLACE FUNCTION fetch_locations() RETURNS TABLE(
  description varchar,
  lat double precision,
  lng double precision,
  people json
) AS $ $ BEGIN RETURN QUERY
SELECT
  places.description,
  places.lat,
  places.lng,
  (
    select
      json_agg(
        json_build_object(
          'id',
          users.id,
          'name',
          users.name,
          'avatar_url',
          users.avatar_url
        )
      )
    from
      users
  ) as people
from
  places;

END;

$ $ LANGUAGE plpgsql;