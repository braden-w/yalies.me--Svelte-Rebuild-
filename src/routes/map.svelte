<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
	import { onMount } from 'svelte';
	mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

	const NewHaven = { longitude: -72.9, latitude: 41.3 };
	// longitude = userProfileInformation.location?.longitude ?? NewHaven.longitude;
	// latitude = userProfileInformation.location?.latitude ?? NewHaven.latitude;
	// console.log('longitude, latitude:>> ', longitude, latitude)
	onMount(() => {
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/dark-v10',
			center: [NewHaven.longitude, NewHaven.latitude],
			doubleClickZoom: false,
			zoom: 8,
			maxZoom: 10
		});

		/** Add a search bar to the map */
		const geocoder = new MapboxGeocoder({
			// * Options here: https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md#mapboxgeocoder
			accessToken: mapboxgl.accessToken,
			placeholder: 'Jump to location',
			// proximity: {
			// 	longitude: longitude,
			// 	latitude: latitude
			// },
			marker: false
			/*     mapboxgl: mapboxgl, */
		});
		map.addControl(geocoder);

		map.on('load', () => {
			map.flyTo({
				center: [longitude!, latitude!],
				speed: 2.5,
				essential: true
			});
			// loadFacebook(map!, queryYear)
		});
		// Create a marker on the map that the user can move around
		// new mapboxgl.Marker().setLngLat([coords.value.longitude, coords.value.latitude]).addTo(map)
	});
</script>

<svelte:head>
	<title>Map</title>
	<meta name="description" content="Find Yale Students in the area to meet up!" />
</svelte:head>

<!-- Init mapbox -->
<div id="map" class="w-full" />

<style>
	#map {
		height: calc(100vh - 4rem);
	}
</style>
