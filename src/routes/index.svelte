<script lang="ts" context="module">
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
  import ListOfLocations from '$lib/components/ListOfLocations.svelte';
  import type { definitionsJSON } from '$lib/types/definitionsJSON';
  import { supabase } from '$lib/utils/supabaseClient';

  export const prerender = true;
  export let places: definitionsJSON['places_with_people'][] | null;
  const checked = false;
</script>

<svelte:head>
  <title>Landing</title>
  <meta name="description" content="Log into the map!" />
</svelte:head>

<div
  class="hero mx-auto min-h-screen max-w-md bg-base-100 text-base-content md:max-w-full"
>
  <div class="hero-content px-4 text-center md:px-0">
    <div>
      <h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">
        Get Started
      </h2>
      <!-- <h3 class="mb-5 text-3xl font-bold">Hop Onto One of the Quick Links</h3> -->
      <!-- <p class="mx-auto mb-5 w-full max-w-lg">Caption</p> -->
      <!-- <div class="font-bold">Creating a button</div> -->
      <!-- using only utility classes vs using daisyUI component classes -->
      <div class="mt-10 mb-20 flex flex-col lg:flex-row">
        <div class="flex w-full flex-col text-left">
          <div class="mt-4 flex h-16 items-start justify-center">
            <button
              class="inline-block cursor-pointer rounded-md bg-indigo-600 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-indigo-700"
            >
              New Haven
            </button>
          </div>
        </div>
        <div
          class="divider uppercase text-base-content/50 lg:divider-horizontal"
        >
          vs
        </div>
        <div class="flex w-full flex-col text-left">
          <div class="mt-4 flex h-16 items-start justify-center">
            <button
              class="inline-block cursor-pointer rounded-md bg-indigo-600 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-indigo-700"
              >Map</button
            >
          </div>
        </div>
        <div
          class="divider uppercase text-base-content/50 lg:divider-horizontal"
        >
          vs
        </div>
        <div class="flex w-full flex-col text-left">
          <div class="mx-auto w-full max-w-xs flex-grow shadow-lg sm:max-w-md">
            <ListOfLocations {places} />
          </div>
          <div class="mt-4 flex h-16 items-start justify-center">
            <button class="btn btn-primary">Button</button>
          </div>
        </div>
      </div>

      <div class="mt-6 mb-10 flex w-full justify-center">
        <a href="/components" class="btn btn-primary btn-wide"
          >See All Components</a
        >
      </div>
    </div>
  </div>
</div>

<div class="min-h-screen-nav hero bg-base-200">
  <div
    class="flex w-full flex-col items-stretch gap-4 px-4 pt-1 pb-10 md:grid md:grid-flow-col md:grid-cols-12 md:grid-rows-6"
  >
    <!-- Cell 1 -->
    <div class="col-span-4 row-span-6 xl:col-span-3">
      <div class="flex flex-col gap-4">
        <!-- <UserCard bind:userProfileInformation={$profileStore} /> -->
        <div class="rounded-box mt-4 bg-neutral py-2 shadow-xl xl:w-full">
          <!-- <UserSocials bind:userProfileInformation={$profileStore} /> -->
        </div>
        <!-- <UserLocationCard bind:userProfileInformation={$profileStore} /> -->
        <ListOfLocations {places} />
      </div>
    </div>
    <!-- Cell 2 -->
    <!-- <div class="col-span-4 row-span-3 xl:col-span-2">
      <SpotifyPlayer url={$profileStore?.expression} />
      <UserAvatarsRow {userProfileInformation} />
    </div> -->
    <!-- Cell 3 -->
    <!-- <div class="col-span-4 row-span-3 xl:col-span-3" /> -->
    <!-- Cell 4 -->
    <!-- <div class="col-span-4 row-span-3 xl:col-span-3">
      <div
        class="rounded-box mx-2 flex flex-shrink-0 flex-col justify-center gap-4 bg-base-100 p-4 shadow-xl xl:mx-0 xl:w-full"
      >
        <ListOfLocations {places} />
      </div>
    </div> -->
    <!-- Cell 5 -->
    <div class="col-span-8 row-span-6 xl:col-span-9">
      <!-- <UserResponsesCard bind:userProfileInformation={$profileStore} /> -->
    </div>

    <!-- <div class="col-span-2 row-span-3"> -->
    <!-- <UserStatsInfoOptions {userProfileInformation} /> -->
    <!-- </div> -->
    <!-- Cell 6 -->
    <!-- <div class="col-span-2 row-span-3"> -->
    <!-- </div> -->

    <!-- 
      
      <UserMenuItems {userProfileInformation} />
       -->

    <!-- TODO: Button for Go to Locations
       <div class="form-control">
      <div class="divider" />
      <a class="btn btn-secondary btn-block space-x-2" href="/locations">
        Insert an svg of a list of Locations
        <LocationsListIcon />

        <span>Go to Locations</span>
      </a>
    </div> -->
  </div>
</div>
