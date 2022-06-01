<script lang="ts">
  import MapIcon from '$lib/components/icons/MapIcon.svelte';
  import LocationsListIcon from '$lib/components/icons/LocationsListIcon.svelte';
</script>

<div class="card flex flex-col justify-between bg-base-100 p-4 md:flex-row">
  <a
    href="/places/New Haven, CT, USA"
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
