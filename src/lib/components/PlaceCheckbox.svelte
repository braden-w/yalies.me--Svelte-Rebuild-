<script lang="ts">
  import {
    profileStore,
    setUserLocation
  } from '$lib/stores/auth/profileStore';
  import type { PlaceInformation } from 'src/routes/places/[place_id].svelte';
  import { createEventDispatcher } from 'svelte';

  export let placeInformation: PlaceInformation;

  /** Is the current logged in user in this location? */
  const isCurrentUserInPlace: boolean = placeInformation.users_in_place
    .map((user) => user.id)
    .includes($profileStore?.id as string);

  // Check if the user is in the place
  let checked = isCurrentUserInPlace;

  /** Old location, which the user will reset to */
  const oldPlace = {
    place_id: $profileStore?.place_id,
    description: $profileStore?.description
  };

  $: handleToggleUserLocation(checked);
  const dispatch = createEventDispatcher();
  export async function handleToggleUserLocation(checked: boolean) {
    // If the toggle is moved to checked
    if (checked) {
      await setUserLocation(placeInformation.place_id);
      console.log(
        '🚀 ~ file: PlaceCheckbox.svelte ~ line 33 ~ handleToggleUserLocation ~ placeInformation.place_id',
        placeInformation.place_id
      );
    } else {
      if (oldPlace.place_id === placeInformation.place_id)
        await setUserLocation(null);
      else await setUserLocation(oldPlace.place_id as string);
    }
    dispatch('toggled');
  }
</script>

<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">
      I'm currently in {placeInformation.description}
    </span>
    <input type="checkbox" class="toggle toggle-accent" bind:checked />
  </label>
</div>
