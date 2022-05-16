-- List all places from the database. Return it as a list of items that contains place description, place lat, place lng, and place people
-- Place people is a list of users that are associated with the place
-- Each user has a id, name, and avatar_url

select description, lat, lng, (select json_agg(json_build_object('id', users.id, 'name', users.name, 'avatar_url', users.avatar_url)) from users) from places 