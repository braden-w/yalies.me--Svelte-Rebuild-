-- Split Facebook Address TO Just City
create
or replace function split_facebook_address_to_just_city(description text) returns text as $ $
select
	split_part($ 1, E '\n', 2) $ $ language sql;