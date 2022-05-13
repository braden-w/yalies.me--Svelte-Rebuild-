<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Auth from '$lib/Auth.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Auth />

<style></style>
