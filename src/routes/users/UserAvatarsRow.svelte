

<script lang="ts">
import type { UserProfileInformation } from "src/routes/users/[id].svelte";


  export let userProfileInformation: UserProfileInformation;
</script>

<div class="col-span-1 row-span-1">
        <div
          class="mx-2 flex w-72 flex-shrink-0 flex-col justify-center xl:mx-0 xl:w-full"
        >
          <div class="flex items-center justify-between">
            <div class="online avatar">
              <div class="mask mask-squircle h-16 w-16 bg-base-100 p-1">
                <img
                  src={userProfileInformation.avatar_url}
                  alt="Avatar Tailwind CSS Component"
                  class="mask mask-squircle"
                />
              </div>
            </div>
            <div class="online avatar">
              <div class="mask mask-squircle h-16 w-16 bg-base-100 p-1">
                <img
                  src={userProfileInformation.avatar_url}
                  alt="Avatar Tailwind CSS Component"
                  class="mask mask-squircle"
                />
              </div>
            </div>
            <div class="avatar offline">
              <div class="mask mask-squircle h-16 w-16 bg-base-100 p-1">
                <img
                  src={userProfileInformation.avatar_url}
                  alt="Avatar Tailwind CSS Component"
                  class="mask mask-squircle"
                />
              </div>
            </div>
            <div class="avatar">
              <div class="mask mask-squircle h-16 w-16 bg-base-100 p-1">
                <img
                  src={userProfileInformation.avatar_url}
                  alt="Avatar Tailwind CSS Component"
                  class="mask mask-squircle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

