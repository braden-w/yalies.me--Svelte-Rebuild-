<script lang="ts">
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
				selected = null;
			}
			loading = false;
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
	class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
	id="location"
	placeholder="Start typing your city here..."
	bind:value={query}
	on:input={handleQueryChange}
/>
<!-- For each result in results, display  -->
{#if results.length > 0}
	<ul class="menu bg-base-100 w-full p-2 rounded-box">
		{#each results as result}
			<li
				class="menu-item bg-base-200 w-full p-2 rounded-box"
				on:click={() => {
					query = result.description;
					selected = result;
				}}
			>
				{result.description}
			</li>
		{/each}
	</ul>
{/if}
