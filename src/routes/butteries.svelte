<script context="module" lang="ts">
	export const prerender = true;
</script>

<svelte:head>
	<title>Butteries</title>
	<meta name="description" content="Butteries" />
</svelte:head>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		<!-- Insert an iFrame element of yalebutterybook.com -->
		<iframe title="Yale Buttery Book" src="https://yalebutterybook.com/" />
	</div>
	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			<!-- Sidebar content here -->
			<li><a href="summer">Who's in New Haven</a></li>
			<li><a href="map">Map (Place Yourself on a Map, find Yalies Near Me)</a></li>
			<li><a href="rides">Ride Share</a></li>
			<li><a href="meals">Track Meals</a></li>
			<li><a href="butteries">Track Meals</a></li>
		</ul>
	</div>
</div>
