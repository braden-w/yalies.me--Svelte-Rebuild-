<script context="module" lang="ts">
  import type { definitionsJSON } from '$lib/types/definitionsJSON';
  import { supabase } from '$lib/utils/supabaseClient';

  export async function load() {
    const { data: places, error } = await supabase
      .from<definitionsJSON['places_with_people']>('places_with_people')
      .select('*')
      .not('people', 'is', null);
    if (error) console.error(error);
    return {
      status: 200,
      props: {
        places
      }
    };
  }
</script>

<script lang="ts">
  import { profileStore } from '$lib/stores/auth/profileStore';
  import LocationAutoComplete from '$lib/components/LocationAutoComplete.svelte';
  import ListOfLocations from '$lib/components/ListOfLocations.svelte';
  import TableOfLocations from '$lib/components/TableOfLocations.svelte';

  export let places: definitionsJSON['places_with_people'][] = [];
</script>

<svelte:head>
  <title>Edit Location</title>
  <meta name="description" content="Edit my current location." />
</svelte:head>

<!-- Put a centered card on the screen. Inside it, there are multiple labelled inputs that are binded to the corresponding properties of the user -->
<!-- <div class="w-full max-w-md mx-auto">
	<div
		class="px-8 pt-6 pb-8 mb-4 rounded-lg shadow-md card card-bordered bg-secondary text-secondary-content"
	>
		
		<div class="mb-4">
		</div>
		<div class="mb-4">
			<label class="block mb-2 text-sm font-bold" for="website"> Website </label>
			<input
				class="w-full border rounded shadow input focus:outline-none focus:shadow-outline"
				id="website"
				type="text"
				placeholder="Website"
			/>
		</div>
		<div class="justify-end card-actions">
			<button class="text-white btn">Change</button>
		</div>
	</div>
</div> -->
<!-- <div class="hero min-h-screen-nav from-primary via-secondary to-base-200 bg-gradient-to-b text-primary-content grid" > -->
<div class="hero grid bg-base-200 p-4 text-base-content">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Where are you now?</h1>
      <p class="py-6">
        Enter your current city. For privacy, feel free to use a city that is in
        proximity rather than exact location.
      </p>
    </div>
    <div class="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      <div class="card-body text-base-content">
        <div class="text-center">
          <div class="avatar mx-auto">
            <div class="w-28 rounded">
              <img
                src={$profileStore?.avatar_url}
                alt="Profile"
                width="100%"
                height="100%"
                referrerpolicy="no-referrer"
              />
            </div>
          </div>
          <h1 class="text-2xl font-bold">{$profileStore?.name}</h1>
          <p class="text-lg">Yale University</p>
        </div>
        <LocationAutoComplete
          query={$profileStore?.description}
          isCurrentUser={true}
        />

        <div class="form-control mt-6">
          <a href="/map" class="btn btn-primary" sveltekit:prefetch>
            <!-- <MapIcon /> -->
            Go To Map
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="m-4">
  <div class="hero bg-base-100">
    <div class="hero-content mx-4 w-full flex-row flex-wrap px-4">
      <div class="w-full overflow-x-auto">
        <div class="w-full">
          <h1 class="text-5xl font-bold">Locations</h1>
          <p class="py-6">There are currently a lot of locations!</p>
        </div>
        <ListOfLocations {places}/>
        <TableOfLocations {places} />
      </div>
    </div>
  </div>
</div>
