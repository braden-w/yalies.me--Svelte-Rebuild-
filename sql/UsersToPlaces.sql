CREATE
OR REPLACE VIEW users_to_places AS
SELECT
  users.id,
  users.name,
  users.avatar_url,
  places.place_id,
  places.description
FROM
  users
  LEFT JOIN user_responses ON users.user_response_id = user_responses.user_response_id
  LEFT JOIN places on places.place_id = user_responses.place_id