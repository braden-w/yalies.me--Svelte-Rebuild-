<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let query = '';
	let loading = false;
	let results: google.maps.places.AutocompletePrediction[] = [];
	let selected = null;

	// When query changes value
	let timer: NodeJS.Timeout | null;
	function handleQueryChange() {
		if (query.length < 2) {
			results = [];
			selected = null;
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
				selected = null;
			}
			loading = false;
		});
	}

	async function handleClick(clicked: google.maps.places.AutocompletePrediction) {
		try {
			query = clicked.description;
			selected = clicked;
			// Upload the place_id and description props to supabase
			const { place_id, description } = clicked;
			const payload = { place_id, description };
			const { error } = await supabase.from('locations').upsert(payload, {
				returning: 'minimal' // Don't return the value after inserting
			});
			if (error) throw error;
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

<label class="block text-sm font-bold mb-2" for="location">Location</label>
<input
	type="text"
	class="input shadow border rounded w-full focus:outline-none focus:shadow-outline"
	id="location"
	placeholder="Start typing your city here..."
	bind:value={query}
	on:input={handleQueryChange}
/>
<!-- For each result in results, display  -->
{#if results.length > 0}
	<ul class="menu bg-base-100 w-full p-2 rounded-box">
		{#each results as result}
			<li class="menu-item bg-base-200 w-full p-2 rounded-box" on:click={handleClick(result)}>
				{result.description}
			</li>
		{/each}
	</ul>
{/if}
