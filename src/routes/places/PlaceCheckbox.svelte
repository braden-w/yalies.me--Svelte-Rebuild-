<script lang="ts">
  import { sessionStore } from '$lib/stores/sessionStore';
  import {
    setUserLocation,
    resetUserLocation,
    userLocationStore,
    refreshUserLocation
  } from '$lib/utils/getUserLocation';
  import type { PlaceInformation } from 'src/routes/places/[place_id].svelte';
  import { createEventDispatcher } from 'svelte';
  import { get } from 'svelte/store';

  export let placeInformation: PlaceInformation;

  /** Is the current logged in user in this location? */
  const userInPlace = placeInformation.users_in_place
    .map((user) => user.id)
    .includes($sessionStore?.id as string);

  let checked = userInPlace;

  /** Old location, which the user will reset to */
  let oldPlace = get(userLocationStore);
  refreshUserLocation().then(() => (oldPlace = get(userLocationStore)));

  $: handleToggleUserLocation(checked);
  const dispatch = createEventDispatcher();
  export async function handleToggleUserLocation(checked: boolean) {
    // If the toggle is moved to checked
    if (checked) {
      await setUserLocation(
        placeInformation.place_id,
        placeInformation.description
      );
      console.log(
        '🚀 ~ file: PlaceCheckbox.svelte ~ line 33 ~ handleToggleUserLocation ~ placeInformation.place_id',
        placeInformation.place_id
      );
    } else {
      if (oldPlace?.places.place_id === placeInformation.place_id)
        await resetUserLocation();
      else
        await setUserLocation(
          oldPlace?.places.place_id as string,
          oldPlace?.places.description as string
        );
    }
    dispatch('toggled');
  }
</script>

<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">
      I'm Currently in {placeInformation.description}
    </span>
    <input type="checkbox" class="toggle" bind:checked />
  </label>
</div>
