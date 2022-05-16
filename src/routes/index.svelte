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
			try {
				$sessionStore = supabase.auth.user();

				// Get the variables "id" from $sessionStore
				const id = $sessionStore?.id;
				const userMetaData = $sessionStore?.user_metadata as UserMetadata;

				// Get the email from userMetaData
				const { email } = userMetaData;
				// Get everything before the @ and after the @ of the email
				const [emailUser] = email.split('@');
				const user_response_id = emailUser;

				// Create payload
				const payload = { id, user_response_id, ...userMetaData };

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
