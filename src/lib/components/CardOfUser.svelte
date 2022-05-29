<script lang="ts">
  import LocationAutoComplete from '$lib/components/LocationAutoComplete.svelte';
  import { sessionStore } from '$lib/stores/sessionStore';
  import type { UserProfileInformation } from 'src/routes/users/[id].svelte';

  export let userProfileInformation: UserProfileInformation;
</script>

<div class="shadow-2xl card place-items-center rounded-2xl bg-base-100">
  <div class="card-body">
    <div class="text-center">
      <div class="mx-auto avatar">
        <div class="rounded w-28">
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

    {#if userProfileInformation?.id === $sessionStore?.id}
      <LocationAutoComplete />
    {:else}
      <div class="form-control">
        <label class="label" for="location">
          <span class="label-text">I'm currently in...</span>
        </label>
        <input
          tabindex="0"
          type="text"
          id="location"
          class="input input-bordered"
          disabled
          placeholder="Start typing your city here..."
          bind:value={userProfileInformation.user_responses.places.description}
        />
      </div>
    {/if}

    <div class="mt-6 form-control">
      <a href="/map" class="btn btn-primary">Go To Map</a>
    </div>
  </div>
</div>
