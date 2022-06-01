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
<div class="hero min-h-screen bg-base-100">
  <div class="hero-content w-full flex-row flex-wrap">
    <div class="w-full overflow-x-auto">
      <div class="w-full">
        <h1 class="text-5xl font-bold">Locations</h1>
        <p class="py-6">There are currently a lot of locations!</p>
      </div>
      <TableOfLocations {places} />
    </div>
  </div>
</div>
