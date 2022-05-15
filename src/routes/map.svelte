<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
	mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

	const NewHaven = { longitude: -72.9, latitude: 41.3 };
	// longitude = userProfileInformation.location?.longitude ?? NewHaven.longitude;
	// latitude = userProfileInformation.location?.latitude ?? NewHaven.latitude;
	// console.log('longitude, latitude:>> ', longitude, latitude)
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
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- Init mapbox -->
<div id="map" />

<style></style>
