<script context="module" lang="ts">
	export const prerender = true;
</script>

<script>
	import { user } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import Auth from '$lib/Auth.svelte';
	import Profile from '$lib/Profile.svelte';

	// Get login state on page load
	$user = supabase.auth.user();

	supabase.auth.onAuthStateChange((_, session) => {
		if (session) $user = supabase.auth.user();
		else $user = null;
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if $user}
	<Profile />
{:else}
	<Auth />
{/if}
