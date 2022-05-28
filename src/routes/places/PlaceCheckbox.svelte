<script lang="ts">
  import { sessionStore } from '$lib/stores/sessionStore';
  import {
    setUserLocation,
    resetUserLocation,
    userLocationStore
  } from '$lib/utils/getUserLocation';
  import type { PlaceInformation } from 'src/routes/places/[place_id].svelte';
  import { createEventDispatcher } from 'svelte';

  export let placeInformation: PlaceInformation;

  /** Is the current logged in user in this location? */
  const userInPlace = placeInformation.users_in_place
    .map((user) => user.id)
    .includes($sessionStore?.id as string);

  let checked = userInPlace;

  /** Old location, which the user will reset to */
  const oldPlace = $userLocationStore;

  $: handleToggleUserLocation(checked);
  const dispatch = createEventDispatcher();
  export async function handleToggleUserLocation(checked: boolean) {
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
        resetUserLocation();
      else
        await setUserLocation(
          oldPlace?.places.place_id as string,
          oldPlace?.places.description as string
        );
      console.log(
        '🚀 ~ file: PlaceCheckbox.svelte ~ line 41 ~ handleToggleUserLocation ~           oldPlace?.places.place_id,',
        oldPlace,
        oldPlace?.places.place_id
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
