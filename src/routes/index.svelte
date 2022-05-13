<script context="module" lang="ts">
	export const prerender = true;
</script>

<script>
	import { user } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import Auth from '$lib/Auth.svelte';
	import Profile from '$lib/Profile.svelte';

	$user = supabase.auth.user();

	supabase.auth.onAuthStateChange((_, session) => {
		if (session) $user = session;
		else $user = null;
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container" style="padding: 50px 0 100px 0;">
	{#if $user}
		<Profile />
	{:else}
		<Auth />
	{/if}
</div>

<style></style>
