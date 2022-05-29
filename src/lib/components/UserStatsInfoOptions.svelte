<script lang="ts">
  import type { UserProfileInformation } from 'src/routes/users/[id].svelte';

  export let userProfileInformation: UserProfileInformation;
  let tab = 0;
</script>

<div
  class="flex flex-col flex-shrink-0 mx-2 col-span-3 row-span-3 w-72 xl:mx-0 xl:w-full"
>
  <div class="flex-grow-0 w-full tabs">
    <button
      class="flex-1 tab tab-lifted tab-border-none tab-lg"
      class:tab-active={tab === 0}
      on:click={() => (tab = 0)}
    >
      Stats
    </button>
    <button
      class="flex-1 tab tab-lifted tab-border-none tab-lg"
      class:tab-active={tab === 1}
      on:click={() => (tab = 1)}
    >
      Info
    </button>
    <button
      class="flex-1 tab tab-lifted tab-border-none tab-lg"
      class:tab-active={tab === 2}
      on:click={() => (tab = 2)}
    >
      Options
    </button>
  </div>

  <!-- Begin Tab Page 0 -->
  {#if tab === 0}
    <div
      class="flex-grow w-full p-6 rounded-tl-none shadow-xl grid gap-3 rounded-xl bg-base-100"
    >
      <div class="flex items-center space-x-2">
        <div class="dropdown">
          <div tabindex="0">
            <div class="online avatar">
              <div
                class="w-16 h-16 p-px mask mask-hexagon bg-base-content bg-opacity-10"
              >
                <img
                  src={userProfileInformation.avatar_url}
                  alt="Avatar Tailwind CSS Component"
                  class="mask mask-hexagon"
                />
              </div>
            </div>
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  avatar component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Use avatar component with any size
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/avatar"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="text-lg font-extrabold">Braden Wong</div>
          <div class="text-sm text-base-content/70">220 Followers</div>
        </div>
      </div>
      <div class="dropdown">
        <div tabindex="0">
          <div class="m-0 divider text-base-content/60">Reports</div>
        </div>
        <div tabindex="0" class="py-2 dropdown-content">
          <div
            class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
          >
            <div class="card-body">
              <h2 class="font-extrabold capitalize card-title">
                divider component
              </h2>
              <p class="text-sm text-neutral-content text-opacity-80">
                User divider component to visually separate items
              </p>
              <div class="flex justify-end mt-4">
                <a
                  href="/components/divider"
                  class="btn btn-primary btn-sm xl:btn-md">See component</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-lg font-extrabold">Follower Report</div>
      <div class="grid gap-3">
        <div class="dropdown-top dropdown">
          <div tabindex="0">
            <div class="flex items-center p-1">
              <span class="w-48 text-xs text-base-content/70"
                >Search Engines</span
              >
              <progress
                max="100"
                class="progress progress-success"
                value="50"
              />
            </div>
            <div class="flex items-center p-1">
              <span class="w-48 text-xs text-base-content/70">Direct</span>
              <progress
                max="100"
                class="progress progress-primary"
                value="30"
              />
            </div>
            <div class="flex items-center p-1">
              <span class="w-48 text-xs text-base-content/70">Social Media</span
              >
              <progress
                max="100"
                class="progress progress-secondary"
                value="70"
              />
            </div>
            <div class="flex items-center p-1">
              <span class="w-48 text-xs text-base-content/70">Emails</span>
              <progress max="100" class="progress progress-accent" value="90" />
            </div>
            <div class="flex items-center p-1">
              <span class="w-48 text-xs text-base-content/70">Ad campaigns</span
              >
              <progress
                max="100"
                class="progress progress-warning"
                value="65"
              />
            </div>
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  progress component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Show progressbar, loadings or simple bar charts using progress
                  component
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/progress"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  <!-- Begin Tab Page 1 -->
  {#if tab === 1}
    <div
      class="items-stretch flex-shrink-0 mx-2 shadow-xl rounded-box col-span-3 row-span-3 grid w-72 bg-base-100 text-base-content xl:mx-0 xl:w-auto xl:place-self-stretch"
    >
      <div class="p-4 grid place-content-center gap-4">
        <div class="dropdown dropdown-end">
          <div tabindex="0">
            <div class="flex-col alert space-y-2">
              <div class="flex-1">
                <span class="mx-3 text-sm"
                  >Lorem ipsum dolor sit amet, consectetur adip!</span
                >
              </div>
              <div class="flex-none">
                <button class="mr-2 btn btn-outline btn-primary btn-sm"
                  >Cancel</button
                > <button class="btn btn-primary btn-sm">Apply</button>
              </div>
            </div>
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  alert component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Show alerts, warnings, notification or other info
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/alert"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown-top dropdown dropdown-end">
          <div tabindex="0">
            <div class="alert alert-info">
              <div class="flex-1">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="w-6 h-6 mx-2 stroke-current"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  /></svg
                >
                <span class="text-sm"
                  >Lorem ipsum dolor sit amet, consectetur adip!</span
                >
              </div>
            </div>
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  alert component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Show alerts, warnings, notification or other info
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/alert"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown-top dropdown dropdown-end">
          <div tabindex="0">
            <div class="alert alert-success">
              <div class="flex-1">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="w-6 h-6 mx-2 stroke-current"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  /></svg
                >
                <span class="text-sm"
                  >Lorem ipsum dolor sit amet, consectetur adip!</span
                >
              </div>
            </div>
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  alert component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Show alerts, warnings, notification or other info
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/alert"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  <!-- Begin Tab Page 2 -->
  {#if tab === 2}
    <div
      class="flex flex-col justify-center flex-shrink-0 p-4 mx-2 shadow-xl rounded-box col-span-3 row-span-3 w-72 gap-4 bg-base-100 xl:mx-0 xl:w-full"
    >
      <div class="px-6 pt-6">
        <div class="text-xl font-extrabold">Superpower settings</div>
        <div class="my-4 text-xs text-base-content/70">
          Enable your favorite superpowers. Terms and conditions apply
        </div>
        <div class="flex-1 w-full dropdown">
          <div tabindex="0">
            <div class="form-control">
              <label class="cursor-pointer label"
                ><span class="label-text">Enable teleportation</span>
                <input type="checkbox" class="toggle toggle-primary" /></label
              >
            </div>
            <div class="form-control">
              <label class="cursor-pointer label"
                ><span class="label-text">Enable time travel</span>
                <input type="checkbox" class="toggle toggle-secondary" /></label
              >
            </div>
            <div class="form-control">
              <label class="cursor-pointer label"
                ><span class="label-text">Enable laser eyes</span>
                <input type="checkbox" class="toggle toggle-accent" /></label
              >
            </div>
            <div class="form-control">
              <label class="cursor-pointer label"
                ><span class="label-text">Enable immortality</span>
                <input type="checkbox" class="toggle" /></label
              >
            </div>
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  toggle component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Use toggle to switch between two states
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/toggle"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-control">
        <div class="dropdown-top dropdown dropdown-end">
          <div tabindex="0">
            <button class="btn btn-secondary btn-block space-x-2"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-6 h-6 stroke-current"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
              > <span>Apply settings</span></button
            >
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  button component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Buttons come in various shapes, colors and sizes
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/button"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
