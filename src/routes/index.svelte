<script lang="ts" context="module">
  export async function load() {
    refreshPlacesAndTheirPeopleStore();
    return {
      status: 200
    };
  }
</script>

<script lang="ts">
  import LocationsListIcon from '$lib/components/icons/LocationsListIcon.svelte';
  import MapIcon from '$lib/components/icons/MapIcon.svelte';

  import ListOfLocations from '$lib/components/ListOfLocations.svelte';
  import LoginSplashScreen from '$lib/components/LoginSplashScreen.svelte';
  import {
    placesAndTheirPeopleStore,
    refreshPlacesAndTheirPeopleStore
  } from '$lib/stores/placesAndTheirPeopleStore';

  export const prerender = true;
</script>

<svelte:head>
  <title>Landing</title>
  <meta name="description" content="Log into the map!" />
</svelte:head>

<div
  class="min-h-screen-nav hero mx-auto max-w-md bg-base-200 text-base-content md:max-w-full"
>
  <div class="hero-content px-4 text-center md:px-0">
    <div>
      <h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">
        Get Started
      </h2>
      <ListOfLocations places={$placesAndTheirPeopleStore} />
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
            <ListOfLocations places={$placesAndTheirPeopleStore} />
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
<div class="my-2 flex flex-row justify-between">
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
