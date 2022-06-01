<script lang="ts" context="module">
  export async function load() {
    refreshPlacesAndTheirPeopleStore();
    return {
      status: 200
    };
  }
</script>

<script lang="ts">
  import EditProfileIcon from '$lib/components/icons/EditProfileIcon.svelte';

  import LocationsListIcon from '$lib/components/icons/LocationsListIcon.svelte';
  import MapIcon from '$lib/components/icons/MapIcon.svelte';

  import ListOfLocations from '$lib/components/ListOfLocations.svelte';
  import {
    placesAndTheirPeopleStore,
    refreshPlacesAndTheirPeopleStore
  } from '$lib/stores/placesAndTheirPeopleStore';

  export const prerender = true;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Jump to essential pages." />
</svelte:head>

<div
  class="min-h-screen-nav hero mx-auto max-w-md bg-base-200 text-base-content md:max-w-full "
>
  <div class="hero-content px-4 text-center md:px-0">
    <div class="flex flex-col gap-4">
      <h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">
        Get Started
      </h2>
      <ListOfLocations places={$placesAndTheirPeopleStore} />
      <!-- <h3 class="mb-5 text-3xl font-bold">Hop Onto One of the Quick Links</h3> -->
      <!-- <p class="mx-auto mb-5 w-full max-w-lg">Caption</p> -->
      <!-- <div class="font-bold">Creating a button</div> -->
      <!-- using only utility classes vs using daisyUI component classes -->

      <div
        class="card flex flex-col justify-between bg-base-100 p-2 md:flex-row"
      >
        <a
          href="/map"
          sveltekit:prefetch
          class="btn btn-ghost btn-md shrink grow basis-0"
        >
          <MapIcon /> People in New Haven
        </a>
        <div class="divider divider-horizontal" />
        <a
          href="/map"
          sveltekit:prefetch
          class="btn btn-ghost btn-md shrink grow basis-0"
        >
          <MapIcon /> Go To Map
        </a>
        <div class="divider divider-horizontal" />
        <a
          href="/locations"
          sveltekit:prefetch
          class="btn btn-ghost btn-md shrink grow basis-0"
        >
          <LocationsListIcon /> See All Locations
        </a>
      </div>

      <div class="mb-24 flex w-full justify-center">
        <a
          href="/profile"
          sveltekit:prefetch
          class="btn btn-primary btn-md shrink grow basis-0"
        >
          <EditProfileIcon /> Edit Profile
        </a>
      </div>
    </div>
  </div>
</div>
