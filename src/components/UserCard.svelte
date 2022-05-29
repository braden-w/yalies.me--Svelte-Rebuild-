<script lang="ts">
  import type { UserProfileInformation } from 'src/routes/users/[id].svelte';

  export let userProfileInformation: UserProfileInformation;
</script>

<div
  class="items-center h-full p-4 py-8 shadow-xl grid gap-4 rounded-box w-72 place-items-center bg-base-100 xl:mx-0 xl:w-full"
>
  <div class="online avatar">
    <div
      class="w-24 h-24 p-px mask mask-squircle bg-base-content bg-opacity-10"
    >
      <img
        src={userProfileInformation.avatar_url}
        alt="Avatar Tailwind CSS Component"
        class="mask mask-squircle"
        width="94"
        height="94"
      />
    </div>
  </div>

  <div>
    <div class="text-center">
      <div class="text-lg font-extrabold">
        {userProfileInformation?.name}
      </div>
      <div class="my-3 text-sm text-base-content/70">
        Ethics, Politics, & Economics
        <br />
        Yale University
        <br />
        Student
      </div>
    </div>

    <div class="mt-2 text-center">
      <div class="badge badge-ghost">Design</div>
      <div class="badge badge-ghost">Art</div>
      <div class="badge badge-ghost">Illustration</div>
    </div>
  </div>
  <div class="dropdown dropdown-top">
    <div tabindex="0">
      <div class="btn-group">
        <button class="btn btn-accent btn-sm">Follow</button>
        <button
          aria-label="button component"
          class="btn btn-accent btn-square btn-sm"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-6 h-6 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            /></svg
          ></button
        >
      </div>
    </div>
    <div tabindex="0" class="py-2 dropdown-content">
      <div
        class="shadow-xl card compact rounded-box w-72 bg-neutral-focus text-neutral-content"
      >
        <div class="card-body">
          <h2 class="font-extrabold capitalize card-title">
            button group component
          </h2>
          <p class="text-sm text-neutral-content text-opacity-80">
            Use it to group multiple buttons together
          </p>
          <div class="flex justify-end mt-4">
            <a
              href="/components/button-group"
              class="btn btn-primary btn-sm xl:btn-md">See component</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
