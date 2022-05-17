<script context="module">
	import { supabase } from '$lib/utils/supabaseClient';
	export async function load({ params }) {
		const { data, error } = await supabase
			.from('users')
			.select('name, avatar_url, user_responses(places(description))')
			.eq('id', params.id)
			.maybeSingle();

		if (error) return { status: error.code, props: { error } };
		return { status: 200, props: { userProfileInformation: data } };
	}
</script>

<script lang="ts">
	import LocationAutoComplete from '$lib/LocationAutoComplete.svelte';

	export let userProfileInformation: {
		name: string;
		avatar_url: string;
		user_responses: {
			places: {
				description: string;
			};
		};
	};
</script>

<div class="hero min-h-screen-nav bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<div class="text-center">
					<div class="avatar mx-auto">
						<div class="w-28 rounded">
							<img
								src={userProfileInformation?.avatar_url}
								alt="Profile"
								width="100%"
								height="100%"
								referrerpolicy="no-referrer"
							/>
						</div>
					</div>
					<h1 class="text-2xl font-bold">{userProfileInformation?.name}</h1>
					<p class="text-lg">Yale University</p>
				</div>

				<div class="form-control">
					<label class="label" for="location">
						<span class="label-text">I'm currently in...</span>
					</label>
					<input
						tabindex="0"
						type="text"
						id="location"
						class="input input-bordered"
						placeholder="Start typing your city here..."
						bind:value={userProfileInformation.user_responses.places.description}
					/>
				</div>

				<div class="form-control mt-6">
					<a href="/" class="btn btn-primary">Go To Map</a>
				</div>
			</div>
		</div>
	</div>
</div>
