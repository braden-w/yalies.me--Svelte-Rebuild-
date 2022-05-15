<script lang="ts">
	let query = '';
	let loading = false;
	let results = [];
	let selected = null;
	let selectedIndex = -1;
	let selectedLocation = null;
	let selectedLocationIndex = -1;


</script>

<!-- A Location Autocomplete built with DaisyUI that uses the Google Map Places API to autocomplete the location as the user is typing -->

<input type="text" id="location" placeholder="Location" bind:value={query} />
