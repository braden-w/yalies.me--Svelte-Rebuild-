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
	const initPx = 32;
	onMount(() => {
		const map = new mapboxgl.Map({
			container: 'map',
			// style: 'mapbox://styles/mapbox/dark-v10',
			style: 'mapbox://styles/mapbox/streets-v11',
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
		new mapboxgl.Marker().setLngLat([24, 42]).addTo(map);
		// create a HTML element for each feature

		const latLng: [number, number][] = [
			[NewHaven.latitude, NewHaven.longitude],
			[8, 3],
			[11, 3],
			[2, 3],
			[2, 3],
			[2, 3],
			[2, 3],
			[2, 3],
			[2, 3],
			[2, 3],
			[2, 3]
		];
		latLng.forEach(([lat, lng]) => {
			/* Create a div named 'el' with the class 'avatar', like the following html:
			<div class="avatar">
			  <div class="w-24 rounded">
			    <img src="https://api.lorem.space/image/face?hash=92048" />
			  </div>
			</div> */

			const el = document.createElement('div');
			el.className = 'marker';
			el.innerHTML = `<button name="selected" class="stack">
	<div class="avatar indicator">
		<span class="indicator-item badge badge-secondary"></span>
		<div class="w-16 h-16 rounded-lg outline-on-click">
			<img src="https://api.lorem.space/image/face?w=160&h=160" />
		</div>
	</div>
	<div class="avatar">
		<div class="w-16 h-16 rounded-lg" outline-on-click>
			<img src="https://api.lorem.space/image/face?w=160&h=160" />
		</div>
	</div>
	<div class="avatar">
		<div class="w-16 h-16 rounded-lg outline-on-click">
			<img src="https://api.lorem.space/image/face?w=160&h=160" />
		</div>
	</div>
	
</button>`;
			// Object.assign(el.style, {
			// 	backgroundImage: `url('https://i.imgur.com/MK4NUzI.png')`,
			// 	backgroundSize: 'cover',
			// 	'border-radius': '50%',
			// 	cursor: 'pointer',
			// 	height: `${initPx}px`,
			// 	width: `${initPx}px`
			// });
			// On click, add a shadow around it
			el.addEventListener('click', () => {
				// for every element in el with a class "outline-on-click", add the class "ring" to it"
				el.querySelectorAll('.outline-on-click').forEach((el) => {
					el.classList.toggle('ring');
				});
			});

			// document.getElementsByClassName('mapboxgl-canvas')[0].addEventListener('click', () => {
			// 	Object.assign(el.style, { 'box-shadow': '' });
			// });
			new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);
		});
	});
</script>

<svelte:head>
	<title>Map</title>
	<meta name="description" content="Find Yale Students in the area to meet up!" />
</svelte:head>

<!-- Init mapbox -->
<div id="map" class="w-full" />

<div class="stack">
	<div class="avatar indicator">
		<span class="indicator-item badge badge-secondary">typing…</span>
		<div class="w-20 h-20 rounded-lg ring ring-offset-1">
			<img src="https://api.lorem.space/image/face?w=160&h=160" />
		</div>
	</div>
</div>

<style>
	#map {
		height: calc(100vh - 4rem);
	}
</style>
