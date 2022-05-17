<script lang="ts">
	import { supabase } from '$lib/utils/supabaseClient';
	import { sessionStore } from '$lib/utils/sessionStore';
	import type { definitions } from '$lib/types/supabase';

	let query = '';
	let loading = false;
	let results: google.maps.places.AutocompletePrediction[] = [];
	supabase
		.from<definitions['users']>('users')
		.select('user_responses(places(place_id, description))')
		.eq('id', $sessionStore?.id)
		.maybeSingle()
		.then(({ data, error }) => {
			if (data) {
				const typed_data = data as unknown as {
					user_responses: { places: { place_id: string; description: string } };
				};
				query = typed_data.user_responses.places.description;
			}
		});

	// When query changes value
	let timer: NodeJS.Timeout | null;
	function handleQueryChange() {
		if (query.length < 2) {
			results = [];
		} else {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				fetchResults();
			}, 300);
		}
	}

	// Fetch results from the Google Places API
	function fetchResults() {
		loading = true;
		const sessionToken = new google.maps.places.AutocompleteSessionToken();
		const service = new google.maps.places.AutocompleteService();
		const request: google.maps.places.AutocompletionRequest = {
			input: query,
			sessionToken
		};
		service.getPlacePredictions(request, (response, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				loading = false;
				results = response ?? [];
				console.log(results);
			}
			loading = false;
		});
	}

	async function handleClick(clicked: google.maps.places.AutocompletePrediction) {
		try {
			query = clicked.description;
			// Upload the place_id and description props to supabase
			const { place_id, description } = clicked;

			// Get the latitude and longitude from place_id using the Google Places API
			const geocoder = new google.maps.Geocoder();

			const { results } = await geocoder.geocode({ placeId: place_id });

			// Get lat and lng from results
			const { geometry } = results[0];
			const { location } = geometry;
			const { lat: latFunction, lng: lngFunction } = location;
			const lat = latFunction();
			const lng = lngFunction();

			// Upload place to places in Supabase
			const payload = {
				place_id,
				description,
				geog: `SRID=4326;POINT(${lng} ${lat})`
			};
			console.log(payload);
			const { error: errorPlaces } = await supabase.from('places').upsert(payload, {
				returning: 'minimal' // Don't return the value after inserting
			});
			if (errorPlaces) throw errorPlaces;

			const user_response_id = $sessionStore?.user_response_id;
			const { error: errorUserIDtoPlaceID } = await supabase.from('user_responses').upsert(
				{ place_id, user_response_id },
				{
					returning: 'minimal' // Don't return the value after inserting
				}
			);

			if (errorUserIDtoPlaceID) throw errorUserIDtoPlaceID;
		} catch (error: any) {
			alert(error.message);
		}
	}
</script>

<svelte:head>
	<script
		async
		defer
		type="text/javascript"
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZFzojqVe47aB3f_QwnU9IKaCZEbeuG0A&libraries=places">
	</script>
</svelte:head>

<!-- A Location Autocomplete built with DaisyUI that uses the Google Map Places API to autocomplete the location as the user is typing -->

<div class="dropdown dropdown-top w-full">
	<div class="form-control">
		<label class="label" for="location">
			<span class="label-text">City</span>
		</label>
		<input
			tabindex="0"
			type="text"
			id="location"
			class="input input-bordered"
			placeholder="Start typing your city here..."
			bind:value={query}
			on:input={handleQueryChange}
		/>
		<label class="label">
			<a href="#" class="label-text-alt link link-hover">Forgot password?</a>
		</label>
	</div>

	<!-- For each result in results, display  -->
	{#if results.length > 0}
		<ul
			class="menu menu-compact dropdown-content  p-2 shadow bg-base-100 rounded-box text-sm overflow-y-auto"
			tabindex="0"
		>
			{#each results as result}
				<li on:click={handleClick(result)}>
					<button>
						{result.description}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
