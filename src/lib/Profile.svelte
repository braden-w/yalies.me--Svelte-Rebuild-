<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { definitions } from '../../types/supabase';
	import { user } from '$lib/sessionStore';

	let loading = true;
	let formData: definitions['user_data'] | null = null;

	async function getProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();

			let { data, error, status } = await supabase
				.from<definitions['user_data']>('user_data')
				.select(
					`email, interests, expression, location, university, full_name, photo, instagram, linkedin, phone, major, year`
				)
				.eq('email', user?.email)
				.single();

			if (error && status !== 406) throw error;
			if (data) formData = data;
		} catch (error: any) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}

	async function updateProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url,
				updated_at: new Date()
			};

			let { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal' // Don't return the value after inserting
			});
			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}
	$: $user, console.log($user);
</script>

<form use:getProfile class="form-widget" on:submit|preventDefault={updateProfile}>
	<!-- Create an avatar based off formData.photo with formData.full_name as alt text-->
	<div class="avatar">
		<div class="w-24 rounded">
			<img src={formData?.photo} alt={formData?.full_name} width="100%" height="100%" />
		</div>
	</div>

	<!-- <v-avatar rounded size="128" class="mt-n4">
          <v-img
            :src="userProfileInformation.photo"
            :alt="userProfileInformation.full_name"
          />
        </v-avatar>

        <v-card-title class="mt-n4">
          {{ userProfileInformation.full_name }}
        </v-card-title>

        <v-card-subtitle class="mt-n5">
          {{ userProfileInformation.university }}
        </v-card-subtitle>

        <div class="text-caption font-weight-light my-n4">
          {{ userProfileInformation.$state.college }}
          |
          {{ userProfileInformation.year }}
        </div> -->

	<!-- <div class="subtitle-3">
          {{ userProfileInformation.email }}
        </div> 
      -->
	<div>
		<label for="email">Email</label>
		<input id="email" type="text" value={$user.email} disabled />
	</div>

	<!-- Create a card with inputs  for email, summer -->
	<div class="mt-n4">
		<label for="full_name">Full Name</label>
		<input id="full_name" type="text" value={$user.full_name} />
	</div>
	<div>
		<input
			type="submit"
			class="button block primary"
			value={loading ? 'Loading ...' : 'Update'}
			disabled={loading}
		/>
	</div>

	<div>
		<button class="button block" on:click={signOut} disabled={loading}> Sign Out </button>
	</div>
</form>

{user}
