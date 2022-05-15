<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { sessionStore } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import Auth from '$lib/Auth.svelte';
	import Profile from '$lib/Profile.svelte';
	import type { UserMetadata } from 'types/UserMetaData';

	// Get login state on page load
	$sessionStore = supabase.auth.user();

	supabase.auth.onAuthStateChange(async (_, session) => {
		if (!session) $sessionStore = null;
		else {
			$sessionStore = supabase.auth.user();
			// Get the variables ""
			const userMetaData = $sessionStore?.user_metadata as UserMetadata;

			// Upload profile data from sessionStore to 'user_data_from_google_auth' database
			supabase.from('user_data_from_google_auth').upsert(userMetaData, {
				returning: 'minimal' // Don't return the value after inserting
			});
		}
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
