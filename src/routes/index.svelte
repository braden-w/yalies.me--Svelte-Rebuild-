<script context="module" lang="ts">
	export const prerender = true;
</script>

<script>
	import { sessionStore } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import Auth from '$lib/Auth.svelte';
	import Profile from '$lib/Profile.svelte';

	// Get login state on page load
	$sessionStore = supabase.auth.user();

	supabase.auth.onAuthStateChange((_, session) => {
		if (session) $sessionStore = supabase.auth.user();
		else $sessionStore = null;
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if $sessionStore}
	<Profile />
{:else}
	<Auth />
{/if}
