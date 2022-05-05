<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Counter from '$lib/Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		<label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label>
		<section>
			<h1>
				<div class="welcome">
					<picture>
						<source srcset="svelte-welcome.webp" type="image/webp" />
						<img src="svelte-welcome.png" alt="Welcome" />
					</picture>
				</div>

				to your new<br />SvelteKit app
			</h1>

			<h2>
				try editing <strong>src/routes/index.svelte</strong>
			</h2>

			<Counter />
		</section>
	</div>
	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			<!-- Sidebar content here -->
			<li><a>Sidebar Item 1</a></li>
			<li><a>Sidebar Item 2</a></li>
		</ul>
	</div>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
