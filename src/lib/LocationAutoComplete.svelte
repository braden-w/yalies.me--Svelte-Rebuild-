<script lang="ts">
	import type { GooglePlacesRequest } from 'types/GooglePlacesRequest';

	let query = '';
	let loading = false;
	let results = [];
	let selected = null;

	// When query changes value
	function handleQueryChange() {
		if (query.length < 2) {
			results = [];
			selected = null;
		} else {
			// Fetch results with debounce
			// debounce(fetchResults, 500);
			fetchResults();
		}
	}

	// Fetch results from the Google Places API
	function fetchResults() {
		loading = true;

		// // Search for the city using the Google Places API
		// const request: GooglePlacesRequest = {
		// 	input: query,
		// 	types: ['(cities)'],
		// 	key: import.meta.env.VITE_GOOGLE_MAP_KEY
		// };
		// results = data.predictions;

		const service = new google.maps.places.AutocompleteService();
		service.getQueryPredictions({ input: query }, (response, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				loading = false;
				results = response;
				console.log(results)
				selected = null;
			}
		});
	}

	// Implement a debounce function
	function debounce(callback: () => void, debounceAmount: number) {
		let timeout: number | null = null;
		return () => {
			if (timeout) clearTimeout(timeout);
			timeout = window.setTimeout(callback, debounceAmount);
		};
	}
</script>

<!-- A Location Autocomplete built with DaisyUI that uses the Google Map Places API to autocomplete the location as the user is typing -->

<input
	type="text"
	id="location"
	placeholder="Location"
	bind:value={query}
	on:input={handleQueryChange}
/>
<ul class="menu bg-base-100 w-56 p-2 rounded-box">
	<!-- For each result  -->
</ul>
