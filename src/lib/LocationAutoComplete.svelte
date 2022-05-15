<script lang="ts">
	import type { GooglePlacesRequest } from 'types/GooglePlacesRequest';

	let query = '';
	let loading = false;
	let results: GooglePlacesRequest[] = [];
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
				results = response;
				console.log(results);
				selected = null;
			}
		});
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

<input
	type="text"
	id="location"
	placeholder="Location"
	bind:value={query}
	on:input={handleQueryChange}
/>
<ul class="menu bg-base-100 w-56 p-2 rounded-box">
	<!-- For each result in results, display  -->
	{#each results as result}
		<li
			class="menu-item bg-base-200 hover:bg-base-300 cursor-pointer"
			on:click={() => {
				query = result.description;
				selected = result;
			}}
		>
			{result.description}
		</li>
	{/each}
</ul>
