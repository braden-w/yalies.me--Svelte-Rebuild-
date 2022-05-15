<script context="module" lang="ts">
	export const prerender = true;
</script>


<script lang="ts">
	import { sessionStore, type UserMetadata } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import Auth from '$lib/Auth.svelte';
	import Profile from '$lib/Profile.svelte';

	// Get login state on page load
	$sessionStore = supabase.auth.user();

	supabase.auth.onAuthStateChange(async (_, session) => {
		if (session) {
			$sessionStore = supabase.auth.user();
			// Get the variables ""
			const userMetaData = $sessionStore?.user_metadata as UserMetadata;

			// Upload profile data from sessionStore todatabase
			const { data, error } = await supabase.from('user_data_from_google_auth').upsert(userMetaData, {
				// returning: 'minimal' // Don't return the value after inserting
			});
		} else $sessionStore = null;
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
