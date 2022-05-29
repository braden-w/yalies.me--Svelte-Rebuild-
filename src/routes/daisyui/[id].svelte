<script context="module" lang="ts">
  import type { definitions } from '$lib/types/supabase';
  import { supabase } from '$lib/utils/supabaseClient';

  export type UserProfileInformation = definitions['users'] & {
    user_responses: {
      interests: string;
      expression: string;
      university: string;
      instagram: string;
      linkedin: string;
      phone: string;
      major: string;
      places: {
        description: string;
      };
    };
  };
  export async function load({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
      .from<definitions['users']>('users')
      .select(
        'name, avatar_url, user_responses(interests, expression, university, instagram, linkedin, phone, major, places(description))'
      )
      .eq('id', params.id)
      .maybeSingle();
    if (error) return { status: error.code, props: { error } };
    return {
      status: 200,
      props: { userProfileInformation: { id: params.id, ...data } }
    };
  }
</script>

<script lang="ts">
  export let userProfileInformation: UserProfileInformation;
  const userResponses = [
    {
      name: 'interests',
      label: 'Interests',
      icon: 'heart',
      value: userProfileInformation.user_responses.interests
    },
    {
      name: 'expression',
      label: 'Expression',
      icon: 'smile',
      value: userProfileInformation.user_responses.expression
    },
    // {
    //   name: 'university',
    //   label: 'University',
    //   icon: 'graduation-cap',
    //   value: userProfileInformation.user_responses.university
    // },
    {
      name: 'instagram',
      label: 'Instagram',
      icon: 'instagram',
      value: userProfileInformation.user_responses.instagram
    },
    {
      name: 'linkedin',
      label: 'Linkedin',
      icon: 'linkedin',
      value: userProfileInformation.user_responses.linkedin
    },
    {
      name: 'phone',
      label: 'Phone',
      icon: 'phone',
      value: userProfileInformation.user_responses.phone
    },
    {
      name: 'major',
      label: 'Major',
      icon: 'book',
      value: userProfileInformation.user_responses.major
    }
  ];
</script>

<svelte:head>
  <title>{userProfileInformation.name}</title>
  <meta name="description" content="Profile information" />
  <script
    src="https://kit.fontawesome.com/f538ad6371.js"
    crossorigin="anonymous"></script>
</svelte:head>

<div class="min-h-screen-nav hero bg-base-200">
  <div class="w-full h-full">
    <div
      id="component-demo"
      class="flex items-center w-full px-10 pt-1 pb-10 overflow-x-scroll overflow-y-hidden grid-flow-row grid-cols-12 gap-4 xl:grid xl:overflow-x-auto xl:px-4"
    >
      <div
        class="items-center flex-shrink-0 p-4 py-8 mx-2 shadow-xl rounded-box col-span-3 row-span-3 grid w-72 place-items-center gap-4 bg-base-100 xl:mx-0 xl:w-full"
      >
        <div class="dropdown">
          <div tabindex="0">
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
          <div class="w-full dropdown">
            <div tabindex="0">
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
            </div>
            <div tabindex="0" class="py-2 dropdown-content">
              <div
                class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
              >
                <div class="card-body">
                  <h2 class="font-extrabold capitalize card-title">
                    card component
                  </h2>
                  <p class="text-sm text-neutral-content text-opacity-80">
                    Card component is used to show products, features and more.
                  </p>
                  <div class="flex justify-end mt-4">
                    <a
                      href="/components/card"
                      class="btn btn-primary btn-sm xl:btn-md">See component</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full dropdown">
            <div tabindex="0">
              <div class="mt-2 text-center">
                <div class="badge badge-ghost">Design</div>
                <div class="badge badge-ghost">Art</div>
                <div class="badge badge-ghost">Illustration</div>
              </div>
            </div>
            <div tabindex="0" class="py-2 dropdown-content">
              <div
                class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
              >
                <div class="card-body">
                  <h2 class="font-extrabold capitalize card-title">
                    badge component
                  </h2>
                  <p class="text-sm text-neutral-content text-opacity-80">
                    Use badge component to highlight small inline items
                  </p>
                  <div class="flex justify-end mt-4">
                    <a
                      href="/components/badge"
                      class="btn btn-primary btn-sm xl:btn-md">See component</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown-top dropdown">
          <div tabindex="0">
            <div class="btn-group">
              <button class="btn btn-accent btn-sm">Follow</button>
              <button
                aria-label="button component"
                class="btn btn-square btn-accent btn-sm"
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
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
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
                  <input
                    type="checkbox"
                    class="toggle toggle-secondary"
                  /></label
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
      <div
        class="flex-shrink-0 mx-2 overflow-visible shadow-xl card card-compact col-span-3 row-span-4 w-72 bg-base-100 xl:card-normal xl:mx-0 xl:w-auto"
      >
        <div class="dropdown">
          <div tabindex="0">
            <figure>
              <img
                src="/tailwind-css-component-card-1.jpg"
                alt="Card Tailwind CSS Component"
                class="rounded-t-box"
                width="300"
                height="187"
              />
            </figure>
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  card component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Card component is used to show products, features and more.
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/card"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="flex items-center font-extrabold card-title">
            Card Component
            <div class="dropdown-top dropdown dropdown-end">
              <div tabindex="0">
                <div
                  tabindex="0"
                  class="inline-block mx-1 btn btn-ghost btn-circle btn-xs text-info"
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline w-5 h-5 stroke-current"
                    ><path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    /></svg
                  >
                </div>
              </div>
              <div tabindex="0" class="py-2 dropdown-content">
                <div
                  class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
                >
                  <div class="card-body">
                    <h2 class="font-extrabold capitalize card-title">
                      dropdown component
                    </h2>
                    <p class="text-sm text-neutral-content text-opacity-80">
                      helper dropdown can show an element when focused.
                    </p>
                    <div class="flex justify-end mt-4">
                      <a
                        href="/components/dropdown"
                        class="btn btn-primary btn-sm xl:btn-md"
                        >See component</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full dropdown">
            <div tabindex="0">
              <div class="mb-2">
                <div class="badge badge-ghost">May 14th</div>
              </div>
            </div>
            <div tabindex="0" class="py-2 dropdown-content">
              <div
                class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
              >
                <div class="card-body">
                  <h2 class="font-extrabold capitalize card-title">
                    badge component
                  </h2>
                  <p class="text-sm text-neutral-content text-opacity-80">
                    Use badge component to highlight small inline items
                  </p>
                  <div class="flex justify-end mt-4">
                    <a
                      href="/components/badge"
                      class="btn btn-primary btn-sm xl:btn-md">See component</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="text-sm text-base-content text-opacity-80">
            Use card component to easily show blog posts, products, features,
            items and more.
          </p>
          <div class="justify-end card-actions">
            <div class="dropdown-top dropdown dropdown-end">
              <div tabindex="0">
                <button class="btn btn-primary">Get Started</button>
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
                        class="btn btn-primary btn-sm xl:btn-md"
                        >See component</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col flex-shrink-0 mx-2 col-span-3 row-span-3 w-72 xl:mx-0 xl:w-full"
      >
        <div class="dropdown">
          <div tabindex="0" class="bg-opacity-100">
            <div class="flex-grow-0 w-full tabs">
              <button
                class="flex-1 tab tab-active tab-lifted tab-border-none tab-lg"
                >Stats</button
              >
              <button class="flex-1 tab tab-lifted tab-border-none tab-lg"
                >Info</button
              >
              <button class="flex-1 tab tab-lifted tab-border-none tab-lg"
                >Options</button
              >
            </div>
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  tab component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Beautiful tabs to switch between sections
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/tab"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
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
                        class="btn btn-primary btn-sm xl:btn-md"
                        >See component</a
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
          <div class="text-lg font-extrabold">Audience Report</div>
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
                  <span class="w-48 text-xs text-base-content/70"
                    >Social Media</span
                  >
                  <progress
                    max="100"
                    class="progress progress-secondary"
                    value="70"
                  />
                </div>
                <div class="flex items-center p-1">
                  <span class="w-48 text-xs text-base-content/70">Emails</span>
                  <progress
                    max="100"
                    class="progress progress-accent"
                    value="90"
                  />
                </div>
                <div class="flex items-center p-1">
                  <span class="w-48 text-xs text-base-content/70"
                    >Ad campaigns</span
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
                      Show progressbar, loadings or simple bar charts using
                      progress component
                    </p>
                    <div class="flex justify-end mt-4">
                      <a
                        href="/components/progress"
                        class="btn btn-primary btn-sm xl:btn-md"
                        >See component</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col justify-center flex-shrink-0 mx-2 col-span-3 row-span-1 w-72 xl:mx-0 xl:w-auto"
      >
        <div class="w-full dropdown dropdown-end">
          <div tabindex="0">
            <div class="flex items-center justify-between">
              <div class="online avatar">
                <div class="w-16 h-16 p-1 mask mask-squircle bg-base-100">
                  <img
                    src={userProfileInformation.avatar_url}
                    alt="Avatar Tailwind CSS Component"
                    class="mask mask-squircle"
                  />
                </div>
              </div>
              <div class="online avatar">
                <div class="w-16 h-16 p-1 mask mask-squircle bg-base-100">
                  <img
                    src={userProfileInformation.avatar_url}
                    alt="Avatar Tailwind CSS Component"
                    class="mask mask-squircle"
                  />
                </div>
              </div>
              <div class="avatar offline">
                <div class="w-16 h-16 p-1 mask mask-squircle bg-base-100">
                  <img
                    src={userProfileInformation.avatar_url}
                    alt="Avatar Tailwind CSS Component"
                    class="mask mask-squircle"
                  />
                </div>
              </div>
              <div class="avatar">
                <div class="w-16 h-16 p-1 mask mask-squircle bg-base-100">
                  <img
                    src={userProfileInformation.avatar_url}
                    alt="Avatar Tailwind CSS Component"
                    class="mask mask-squircle"
                  />
                </div>
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
      </div>
      <div
        class="flex-shrink-0 mx-2 shadow-xl rounded-box col-span-3 row-span-4 grid w-72 bg-base-100 text-base-content xl:mx-0 xl:w-auto xl:place-self-stretch"
      >
        <div class="w-full p-4 grid grid-cols-1 gap-4">
          <div class="dropdown">
            <div tabindex="0">
              <div class="w-full grid grid-cols-2 gap-4">
                <button class="btn btn-block">Neutral</button>
                <button class="btn btn-primary btn-block">primary</button>
                <button class="btn btn-secondary btn-block">secondary</button>
                <button class="btn btn-accent btn-block">accent</button>
                <button class="btn btn-info btn-block">info</button>
                <button class="btn btn-success btn-block">success</button>
              </div>
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
          <div class="dropdown-top dropdown">
            <div tabindex="0">
              <div class="w-full grid grid-cols-2 gap-4">
                <button class="btn btn-warning btn-block">warning</button>
                <button class="btn btn-error btn-block">error</button>
                <button class="btn btn-outline btn-block">outline</button>
                <button class="btn btn-outline btn-primary btn-block"
                  >primary</button
                >
                <button class="btn btn-outline btn-secondary btn-block"
                  >secondary</button
                >
                <button class="btn btn-outline btn-accent btn-block"
                  >accent</button
                > <button class="btn btn-ghost btn-block">ghost</button>
                <button class="btn btn-link btn-block">link</button>
              </div>
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
      <div
        class="flex-shrink-0 mx-2 col-span-3 row-span-2 grid w-72 gap-4 xl:mx-0 xl:w-auto"
      >
        <div class="dropdown-top dropdown dropdown-end">
          <div tabindex="0">
            <div class="grid gap-4">
              <div class="flex btn-group">
                <button class="flex-1 btn">1</button>
                <button class="flex-1 btn btn-active">2</button>
                <button class="flex-1 btn">3</button>
                <button class="flex-1 btn">4</button>
                <button class="flex-1 btn">5</button>
              </div>
              <div class="flex btn-group">
                <button class="flex-1 btn btn-outline">1</button>
                <button class="flex-1 btn btn-outline">2</button>
                <button class="flex-1 btn btn-outline">3</button>
                <button class="flex-1 btn btn-outline">4</button>
                <button class="flex-1 btn btn-outline">5</button>
              </div>
            </div>
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  pagination component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Pagination buttons in many colors and sizes!
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/pagination"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown-top dropdown dropdown-end">
          <div tabindex="0">
            <div class="items-center tabs tabs-boxed">
              <button class="flex-1 tab">Tab 1</button>
              <button class="flex-1 tab tab-active">Tab 2</button>
              <button class="flex-1 tab">Tab 3</button>
            </div>
          </div>
          <div tabindex="0" class="py-2 dropdown-content">
            <div
              class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
            >
              <div class="card-body">
                <h2 class="font-extrabold capitalize card-title">
                  tab component
                </h2>
                <p class="text-sm text-neutral-content text-opacity-80">
                  Tab component with several sizes and styles
                </p>
                <div class="flex justify-end mt-4">
                  <a
                    href="/components/tab"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div
        class="flex-shrink-0 mx-2 col-span-3 row-span-2 grid w-72 gap-4 xl:mx-0 xl:w-auto xl:place-self-stretch"
      >
        <div class="shadow-xl rounded-box bg-base-100 text-base-content">
          <div class="w-full dropdown dropdown-end">
            <div tabindex="0">
              <ul class="p-3 overflow-visible menu">
                <li class="menu-title"><span>Menu Title</span></li>
                <li>
                  <button
                    ><svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-5 h-5 mr-2 stroke-current"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      /></svg
                    >
                    Menu Item 1</button
                  >
                </li>
                <li>
                  <button
                    ><svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-5 h-5 mr-2 stroke-current"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      /></svg
                    >
                    Menu Item 2</button
                  >
                </li>
                <li>
                  <button
                    ><svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-5 h-5 mr-2 stroke-current"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      /></svg
                    >
                    Menu Item 3
                    <div class="badge badge-success">new</div></button
                  >
                </li>
              </ul>
            </div>
            <div tabindex="0" class="py-2 dropdown-content">
              <div
                class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
              >
                <div class="card-body">
                  <h2 class="font-extrabold capitalize card-title">
                    menu component
                  </h2>
                  <p class="text-sm text-neutral-content text-opacity-80">
                    Use it for sidebar or any other list of items
                  </p>
                  <div class="flex justify-end mt-4">
                    <a
                      href="/components/menu"
                      class="btn btn-primary btn-sm xl:btn-md">See component</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex-shrink-0 mx-2 col-span-3 row-span-1 grid w-72 gap-4 xl:mx-0 xl:w-auto"
      >
        <div class="shadow-xl rounded-box bg-base-100 text-base-content">
          <div class="w-full dropdown-top dropdown dropdown-end">
            <div tabindex="0">
              <div class="flex justify-center p-4 gap-8">
                <label aria-label="checkbox CSS component"
                  ><input type="checkbox" class="checkbox" /></label
                >
                <label aria-label="checkbox CSS component"
                  ><input
                    type="checkbox"
                    class="checkbox checkbox-primary"
                  /></label
                >
                <label aria-label="checkbox CSS component"
                  ><input
                    type="checkbox"
                    class="checkbox checkbox-secondary"
                  /></label
                >
                <label aria-label="checkbox CSS component"
                  ><input
                    type="checkbox"
                    class="checkbox checkbox-accent"
                  /></label
                >
              </div>
            </div>
            <div tabindex="0" class="py-2 dropdown-content">
              <div
                class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
              >
                <div class="card-body">
                  <h2 class="font-extrabold capitalize card-title">
                    checkbox component
                  </h2>
                  <p class="text-sm text-neutral-content text-opacity-80">
                    Colorful, animated and accessible
                  </p>
                  <div class="flex justify-end mt-4">
                    <a
                      href="/components/checkbox"
                      class="btn btn-primary btn-sm xl:btn-md">See component</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full dropdown dropdown-end">
            <div tabindex="0">
              <div
                class="justify-center w-full px-4 pb-4 rating rating-lg rating-half"
              >
                <input
                  type="radio"
                  aria-label="Rating reset"
                  name="rating-10"
                  class="rating-hidden"
                />
                <input
                  type="radio"
                  aria-label="Rating half star"
                  name="rating-10"
                  class="bg-green-500 mask mask-half-1 mask-star-2"
                />
                <input
                  type="radio"
                  aria-label="Rating 1 star"
                  name="rating-10"
                  class="bg-green-500 mask mask-half-2 mask-star-2"
                />
                <div class="w-1" />
                <input
                  type="radio"
                  aria-label="Rating 1 and half star"
                  name="rating-10"
                  class="bg-green-500 mask mask-half-1 mask-star-2"
                />
                <input
                  type="radio"
                  aria-label="Rating 2 star"
                  name="rating-10"
                  class="bg-green-500 mask mask-half-2 mask-star-2"
                />
                <div class="w-1" />
                <input
                  type="radio"
                  aria-label="Rating 2 and half star"
                  name="rating-10"
                  class="bg-green-500 mask mask-half-1 mask-star-2"
                />
                <input
                  type="radio"
                  aria-label="Rating 3 star"
                  name="rating-10"
                  class="bg-green-500 mask mask-half-2 mask-star-2"
                />
                <div class="w-1" />
                <input
                  type="radio"
                  aria-label="Rating 3 and half star"
                  name="rating-10"
                  class="bg-green-500 mask mask-half-1 mask-star-2"
                />
                <input
                  type="radio"
                  aria-label="Rating 4 star"
                  name="rating-10"
                  class="bg-green-500 mask mask-half-2 mask-star-2"
                />
                <div class="w-1" />
                <input
                  type="radio"
                  aria-label="Rating 4 and half star"
                  name="rating-10"
                  class="bg-green-500 mask mask-half-1 mask-star-2"
                />
                <input
                  type="radio"
                  aria-label="Rating 5 star"
                  name="rating-10"
                  class="bg-green-500 mask mask-half-2 mask-star-2"
                />
              </div>
            </div>
            <div tabindex="0" class="py-2 dropdown-content">
              <div
                class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
              >
                <div class="card-body">
                  <h2 class="font-extrabold capitalize card-title">
                    Rating component
                  </h2>
                  <p class="text-sm text-neutral-content text-opacity-80">
                    Styled radio buttons
                  </p>
                  <div class="flex justify-end mt-4">
                    <a
                      href="/components/rating"
                      class="btn btn-primary btn-sm xl:btn-md">See component</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex-shrink-0 mx-2 col-span-3 row-span-1 grid w-72 gap-4 xl:mx-0 xl:w-auto"
      >
        <div
          class="flex items-center shadow-xl rounded-box bg-neutral text-neutral-content"
        >
          <div class="dropdown-top dropdown">
            <div tabindex="0">
              <div class="px-4 text-sm breadcrumbs">
                <ul>
                  <li>
                    <a href="/"
                      ><svg
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="w-4 h-4 mr-2 stroke-current"
                        ><path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        /></svg
                      >
                      Documents</a
                    >
                  </li>
                  <li>
                    <a href="/"
                      ><svg
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="w-4 h-4 mr-2 stroke-current"
                        ><path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        /></svg
                      >
                      Add Document</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div tabindex="0" class="py-2 dropdown-content">
              <div
                class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
              >
                <div class="card-body">
                  <h2 class="font-extrabold capitalize card-title">
                    breadcrumbs component
                  </h2>
                  <p class="text-sm text-neutral-content text-opacity-80">
                    Make a better navigation with breadcrumbs!
                  </p>
                  <div class="flex justify-end mt-4">
                    <a
                      href="/components/breadcrumbs"
                      class="btn btn-primary btn-sm xl:btn-md">See component</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center p-4 shadow-xl rounded-box bg-accent text-accent-content"
        >
          <div class="flex-1 px-2">
            <h2 class="text-3xl font-extrabold">4,600</h2>
            <p class="text-sm text-opacity-80">Page views</p>
          </div>
          <div class="flex-0">
            <div class="dropdown-top dropdown dropdown-end">
              <div tabindex="0">
                <div class="flex space-x-1">
                  <button
                    aria-label="button component"
                    class="btn btn-square btn-ghost"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-6 h-6 stroke-current"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      /><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      /></svg
                    ></button
                  >
                  <button
                    aria-label="button component"
                    class="btn btn-square btn-ghost"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-6 h-6 stroke-current"
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
                        class="btn btn-primary btn-sm xl:btn-md"
                        >See component</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex-shrink-0 mx-2 overflow-visible shadow-lg card col-span-3 row-span-1 w-72 bg-base-100 xl:mx-0 xl:w-auto xl:place-self-stretch"
      >
        <div class="flex-row items-center px-4 card-body space-x-4">
          <div class="flex-1">
            <h2 class="flex mb-0 card-title">
              <div class="dropdown-top dropdown">
                <div tabindex="0">
                  <button
                    aria-label="loading button"
                    class="btn loading btn-ghost btn-sm btn-circle"
                  />
                </div>
                <div tabindex="0" class="py-2 dropdown-content">
                  <div
                    class="shadow-xl compact card rounded-box w-72 bg-neutral-focus text-neutral-content"
                  >
                    <div class="card-body">
                      <h2 class="font-extrabold capitalize card-title">
                        loading button component
                      </h2>
                      <p class="text-sm text-neutral-content text-opacity-80">
                        Buttons can get loadings state using a simple class
                      </p>
                      <div class="flex justify-end mt-4">
                        <a
                          href="/components/button"
                          class="btn btn-primary btn-sm xl:btn-md"
                          >See component</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              Downloading...
            </h2>
            <div class="w-full dropdown-top dropdown">
              <div tabindex="0">
                <progress
                  max="100"
                  class="progress progress-secondary"
                  value="70"
                />
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
                      Show progressbar, loadings or simple bar charts using
                      progress component
                    </p>
                    <div class="flex justify-end mt-4">
                      <a
                        href="/components/progress"
                        class="btn btn-primary btn-sm xl:btn-md"
                        >See component</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-0">
            <div class="dropdown-top dropdown dropdown-end">
              <div tabindex="0">
                <button
                  aria-label="circle button component"
                  class="btn btn-circle"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-6 h-6 stroke-current"
                    ><path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    /></svg
                  ></button
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
                        class="btn btn-primary btn-sm xl:btn-md"
                        >See component</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- <div class="divider divider-horizontal">OR</div> -->
