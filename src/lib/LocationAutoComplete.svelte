<script lang="ts">
	import type { GooglePlacesRequest } from 'types/GooglePlacesRequest';

	let query = '';
	let loading = false;
	let results = [];
	let selected = null;

	// When query changes value
	let timer;
	function handleQueryChange() {
		if (query.length < 2) {
			results = [];
			selected = null;
		} else {
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
