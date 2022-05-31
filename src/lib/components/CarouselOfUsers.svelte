<script lang="ts">
import type { definitions } from "$lib/types/supabase";


  export let users: definitions['users_facebook_places'][];
</script>

<div
  class="carousel carousel-center rounded-box w-full space-x-4 bg-neutral p-4"
>
  {#each users as user}
    <div class="carousel-item">
      <div class="card w-36 bg-base-100 shadow-xl">
        <figure>
          <img
            src={user.avatar_url}
            alt="Profile"
            width="100%"
            referrerpolicy="no-referrer"
          />
        </figure>
        <div class="card-body">
          <div class="text-center">
            <h1 class="card-title">
              {user.name}
            </h1>
          </div>

          <div class="form-control">
            <div class="divider" />
            <a href={`/users/${user.id}`} class="btn btn-ghost">
              Go to Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
../../routes/places/PlaceCheckbox.svelte../../routes/places/PlaceCheckbox.svelte