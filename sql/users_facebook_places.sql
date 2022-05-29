-- Everything useful to know about a user in one table
CREATE
OR REPLACE VIEW users_facebook_places AS
SELECT
  users.id,
  users.email,
  coalesce(
    users.name,
    CONCAT(facebook.first_name, ' ', facebook.last_name)
  ) as name,
  coalesce(users.avatar_url, facebook.image) as avatar_url,
  places.place_id,
  places.description,
  COALESCE(user_responses.phone, facebook.phone) AS phone,
  user_responses.expression,
  user_responses.instagram,
  user_responses.linkedin,
  facebook.year
FROM
  users
  left JOIN user_responses ON users.user_response_id = user_responses.user_response_id
  left JOIN places on places.place_id = user_responses.place_id full
  join facebook on users.email = facebook.email
where
  facebook.year is not null