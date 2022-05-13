<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<header>
	<Header />
</header>

<main>
	<slot />
</main>

<footer>
	<p>Made with love and <span>❤️</span> by Braden</p>
</footer>

<style></style>
