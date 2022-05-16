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

	/** Get everything before the @ of the email */
	function getUserFromEmail(email: string) {
		const [emailUser] = email.split('@');
		return emailUser;
	}

	supabase.auth.onAuthStateChange(async (_, session) => {
		if (!session) $sessionStore = null;
		else {
			try {
				const session = supabase.auth.user();

				// Get the variables "id" from $sessionStore
				const id = session?.id;

				// Get the user_response_id from userMetaData
				const userMetaData = session?.user_metadata as UserMetadata;
				const { email } = userMetaData;
				const user_response_id = getUserFromEmail(email);

				// Create payload for auth information
				const payload = { id, user_response_id, ...userMetaData };

				// Save profile data to session store
				$sessionStore = payload;

				// Upload profile data from sessionStore to 'user_data_new' database
				const { error } = await supabase.from('users').upsert(payload, {
					returning: 'minimal' // Don't return the value after inserting
				});
				if (error) throw error;
			} catch (error: any) {
				alert(error.message);
			}
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
