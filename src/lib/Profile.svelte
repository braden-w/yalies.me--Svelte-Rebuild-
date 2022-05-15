<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { definitions } from '../../types/supabase';
	import { sessionStore } from '$lib/sessionStore';
	import LocationAutoComplete from '$lib/LocationAutoComplete.svelte';

	let loading = true;
	let userDataFromGoogleAuth =
		$sessionStore?.user_metadata as definitions['user_data_from_google_auth'];

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
			if (data) userDataFromGoogleAuth = data;
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
		} catch (error: any) {
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
		} catch (error: any) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<!-- Put a centered card on the screen. Inside it, there are multiple labelled inputs that are binded to the corresponding properties of the user -->
<div class="w-full max-w-md mx-auto">
	<div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
		<div class="mb-4">
			<div class="avatar mx-auto">
				<div class="w-24 rounded">
					<img src={userDataFromGoogleAuth.avatar_url} alt="Photo" width="100%" height="100%" />
				</div>
			</div>
			<h1 class="text-2xl font-bold">Braden Wong</h1>
			<p class="text-lg">Edit your profile</p>
		</div>
		<div class="mb-4">
			<LocationAutoComplete />
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="website"> Website </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="website"
				type="text"
				placeholder="Website"
			/>
		</div>
	</div>
</div>

<!-- <div class="card"> -->
<!-- 	<div class="card-title"> -->
<!-- 		<h1>Profile</h1> -->
<!-- 	</div> -->
<!-- 	<div class="card-content"> -->
<!-- 		<form on:submit={updateProfile}> -->
<!-- 			<div class="field-row"> -->
<!-- 				<label for="username">Username</label> -->
<!-- 				<input -->
<!-- 					type="text" -->
<!-- 					name="username" -->
<!-- 					value={formData?.username || user.username} -->
<!-- 					on:input={(e: any) => (username = e.target.value)} -->
<!-- 				/> -->
<!-- 			</div> -->
<!-- 			<div class="field-row"> -->
<!-- 				<label for="website">Website</label> -->
<!-- 				<input -->
<!-- 					type="text" -->
<!-- 					name="website" -->
<!-- 					value={formData?.website || user.website} -->
<!-- 					on:input={(e: any) => (website = e.target.value)} -->
<!-- 				/> -->
<!-- 			</div> -->
<!-- 			<div class="field-row"> -->
<!-- 				<label for="avatar_url">Avatar Url</label> -->
<!-- 				<input -->
<!-- 					type="text" -->
<!-- 					name="avatar_url" -->
<!-- 					value={formData?.avatar_url || user.avatar_url} -->
<!-- 					on:

=======

<!-- <div class="card"> -->
<!-- 	<div class="card-body"> -->
<!-- 		<h5 class="card-title">User Profile</h5> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label for="exampleInputEmail1">Email address</label> -->
<!-- 			<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model={formData?.email}> -->
<!-- 			<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
<!-- 		</div> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label for="exampleInputPassword1">Password</label> -->
<!-- 			<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model={formData?.password}> -->
<!-- 		</div> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label for="exampleInputPassword1">Password</label> -->
<!-- 			<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model={formData?.password}> -->
<!-- 		</div> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label for="exampleInputPassword1">Password</label> -->
<!-- 			<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model={formData?.password}> -->
<!-- 		</div> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label for="exampleInputPassword1">Password</label> -->
<!-- 			<input type="password" class="form-control




<form use:getProfile class="form-widget" on:submit|preventDefault={updateProfile}>
	<!-- Create an avatar based off formData.photo with formData.full_name as alt text-->

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
<!-- <div>
	<label for="email">Email</label>
	<input id="email" type="text" value={$sessionStore.email} disabled />
</div>

<div class="mt-n4">
	<label for="full_name">Full Name</label>
	<input id="full_name" type="text" value={$sessionStore.full_name} />
</div> -->

<button class="btn" on:click={signOut}> Sign Out </button>

<!-- </form> -->
