<script lang="ts">
	import '../app.css';

	// Initialize theme-change, taken from https://github.com/saadeghi/theme-change
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { supabase } from '$lib/utils/supabaseClient';
	import { sessionStore } from '$lib/utils/sessionStore';
	import { signOut } from '$lib/utils/auth';
	import type { User } from '@supabase/supabase-js';
	import type { SessionStore } from 'types/SessionStore';
	import type { UserMetadata } from 'types/UserMetaData';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	onMount(() => {
		themeChange(false);
	});

	if (browser) {
		// Get login state on page load
		const user = supabase.auth.user();
		if (!user) goto('/');
		else {
			goto('/map');
			$sessionStore = processAuthState(user);
		}
	}

	supabase.auth.onAuthStateChange(async (_, session) => {
		// If logout
		if (!session) {
			$sessionStore = null;
			goto('/');
		} else {
			// If login
			const user = supabase.auth.user();

			// Save profile data to session store
			$sessionStore = processAuthState(user!);
			try {
				// Upload profile data from sessionStore to 'user_data_new' database
				const { error } = await supabase.from('users').upsert($sessionStore!, {
					returning: 'minimal' // Don't return the value after inserting
				});
				if (error) throw error;
			} catch (error: any) {
				alert(error.message);
			}
		}
	});

	/** Get everything before the @ of the email */
	function getUserFromEmail(email: string): string {
		const [emailUser] = email.split('@');
		return emailUser;
	}

	function processAuthState(user: User): SessionStore {
		// Get the variables "id" from $sessionStore
		const id = user?.id;

		// Get the user_response_id from userMetaData
		const userMetaData = user?.user_metadata as UserMetadata;
		const { email } = userMetaData;
		const user_response_id = getUserFromEmail(email);

		// Create payload for auth information
		const payload = { id, user_response_id, ...userMetaData };

		return payload;
	}
</script>

<div class="bg-base-100 drawer">
	<input id="main-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->

		<main>
			<slot />
		</main>
	</div>
	<div class="drawer-side">
		<label for="main-drawer" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-200 text-base-content">
			<!-- Sidebar content here -->
			<li><a href="summer">Who's in New Haven</a></li>
			<li><a href="map">Map (Place Yourself on a Map, find Yalies Near Me)</a></li>
			<li><a href="rides">Ride Share</a></li>
			<li><a href="meals">Track Meals</a></li>
			<li><a href="butteries">Butteries</a></li>
		</ul>
	</div>
</div>

<!-- <footer>
	<p>Made with love and <span>❤️</span> by Braden</p>
</footer> -->
<style></style>
