<script context="module" lang="ts">
	import type { FetchedLocation } from 'types/FetchedLocation';
	export const prerender = false;
	/** List all places from the database. Return it as a list of items that contains place description, place lat, place lng, and place people
	 * Place people is a list of users that are associated with the place
	 * Each user has a id, name, and avatar_url
	 */
	export async function load() {
		const { data, error } = await supabase.rpc('fetch_locations').not('people', 'is', null);
		console.log('🚀 ~ file: map.svelte ~ line 8 ~ load ~ data', data, error);
		const fetchedLocations = data as FetchedLocation[];
		return { status: 200, props: { fetchedLocations } };
	}
</script>

<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

	import { onMount } from 'svelte';
	import { supabase } from '$lib/utils/supabaseClient';

	mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

	const NewHaven = { longitude: -72.9, latitude: 41.3 };
	// longitude = userProfileInformation.location?.longitude ?? NewHaven.longitude;
	// latitude = userProfileInformation.location?.latitude ?? NewHaven.latitude;
	// console.log('longitude, latitude:>> ', longitude, latitude)
	const initPx = 32;

	export let fetchedLocations: FetchedLocation[];

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
			placeholder: 'Search for City',
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
				center: [NewHaven.longitude, NewHaven.latitude],
				speed: 2.5,
				essential: true
			});
			// loadFacebook(map!, queryYear)
		});

		function generateInnerHTML(fetchedLocation: FetchedLocation) {
			// Get 3 random people from the 'people' property of fetchedLocation
			const shuffledPeople = fetchedLocation.people.sort(() => 0.5 - Math.random());

			// Three cases for the number of people in the fetchedLocation
			if (shuffledPeople.length === 0) return '';
			return `<div class="dropdown dropdown-hover">
				<label tabindex="0" name="selected" class="stack">
					<div class="avatar indicator">
						<span class="indicator-item badge badge-secondary">${fetchedLocation.people.length}</span>
						<div class="w-16 h-16 rounded-lg outline-on-click">
							<img src="${fetchedLocation.people[0].avatar_url}" referrerpolicy="no-referrer"/>
						</div>
					</div>
					${
						shuffledPeople.length >= 2
							? `<div class="avatar">
						<div class="w-16 h-16 rounded-lg outline-on-click">
							<img src="${fetchedLocation.people[1].avatar_url}" referrerpolicy="no-referrer"/>
						</div>
					</div>`
							: ''
					}
					${
						shuffledPeople.length >= 3
							? `<div class="avatar">
						<div class="w-16 h-16 rounded-lg outline-on-click">
							<img src="${fetchedLocation.people[2].avatar_url}" referrerpolicy="no-referrer"/>
						</div>
					</div>`
							: ''
					}
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<a class="justify-between" href="/profile">${fetchedLocation.description}</a>
					</li>
					<li>
						<a class="justify-between" href="/profile">
							${fetchedLocation.people
								.map(
									(person) => `<div class="avatar">
								<div class="w-8 h-8 rounded-lg outline-on-click">
									<img src="${person.avatar_url}" referrerpolicy="no-referrer"/>
								</div>`
								)
								.join('')}
						</a>
					</li>
				</ul>
				</div>`;
		}
		fetchedLocations.forEach((fetchedLocation) => {
			const el = document.createElement('div');
			el.className = 'marker';
			el.innerHTML = generateInnerHTML(fetchedLocation);

			// On click, add a shadow around it
			el.addEventListener('click', () => {
				// For every element in el with a class "outline-on-click", add the class "ring" to it
				el.querySelectorAll('.outline-on-click').forEach((el) => {
					el.classList.add('ring');
				});
			});

			// On click out, add a shadow around it
			document.getElementsByClassName('mapboxgl-canvas')[0].addEventListener('click', () => {
				// For every element in el with a class "outline-on-click", remove the class "ring" to it if it exists
				el.querySelectorAll('.outline-on-click').forEach((el) => {
					el.classList.remove('ring');
				});
			});

			const scalePercent = (
				defaultPxSize: number = 40,
				defaultZoom: number = 8,
				scaleFactor: number = 0.1
			) => {
				const scalePercent = 1 + (map.getZoom() - defaultZoom) * scaleFactor;
				return defaultPxSize * scalePercent;
			};

			/** Scale icons on zoom */
			map.on('zoom', () => {
				const newPx = scalePercent();
				console.log('🚀 ~ file: map.svelte ~ line 135 ~ map.on ~ newPx', newPx);
				el.querySelectorAll('.outline-on-click').forEach((innerEl) => {
					// Set the height and width innerEl to newPx
					innerEl.style.width = `${newPx}px`;
					innerEl.style.height = `${newPx}px`;
				});
				el.style.transformOrigin = 'bottom';
			});

			// Add the marker to the map
			new mapboxgl.Marker(el).setLngLat([fetchedLocation.lng, fetchedLocation.lat]).addTo(map);
		});
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
