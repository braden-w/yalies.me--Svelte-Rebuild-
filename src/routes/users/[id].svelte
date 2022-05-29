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
  import UserResponsesCard from './UserResponsesCard.svelte';
  import UserMenuItems from '../../lib/components/UserMenuItems.svelte';
  import UserLocationCard from '../../lib/components/UserLocationCard.svelte';
  import UserStatsInfoOptions from '../../lib/components/UserStatsInfoOptions.svelte';
  import UserCard from '../../components/UserCard.svelte';

  export let userProfileInformation: UserProfileInformation;
</script>

<svelte:head>
  <title>{userProfileInformation.name}</title>
  <meta name="description" content="Profile information" />
  <script
    src="https://kit.fontawesome.com/f538ad6371.js"
    crossorigin="anonymous"></script>
</svelte:head>

<div class="hero min-h-screen-nav bg-base-200">
  <div class="w-full h-full">
    <div
      id="component-demo"
      class="w-full h-full grid grid-flow-col grid-rows-6 items-stretch overflow-x-auto gap-4 px-4 pt-1 pb-10"
    >
      <!-- Cell 1 -->
      <div class="bg-teal-400 row-span-2">
        <UserCard {userProfileInformation} />
      </div>
      <!-- Cell 2 -->
      <div class="bg-teal-400 row-span-1">
        <div
          class="row-span-1 mx-2 flex w-72 flex-shrink-0 flex-col justify-center xl:mx-0"
        >
          <div class="dropdown dropdown-end w-full">
            <div tabindex="0">
              <div class="flex items-center justify-between">
                <div class="online avatar">
                  <div class="mask mask-squircle bg-base-100 h-16 w-16 p-1">
                    <img
                      src={userProfileInformation.avatar_url}
                      alt="Avatar Tailwind CSS Component"
                      class="mask mask-squircle"
                    />
                  </div>
                </div>
                <div class="online avatar">
                  <div class="mask mask-squircle bg-base-100 h-16 w-16 p-1">
                    <img
                      src={userProfileInformation.avatar_url}
                      alt="Avatar Tailwind CSS Component"
                      class="mask mask-squircle"
                    />
                  </div>
                </div>
                <div class="avatar offline">
                  <div class="mask mask-squircle bg-base-100 h-16 w-16 p-1">
                    <img
                      src={userProfileInformation.avatar_url}
                      alt="Avatar Tailwind CSS Component"
                      class="mask mask-squircle"
                    />
                  </div>
                </div>
                <div class="avatar">
                  <div class="mask mask-squircle bg-base-100 h-16 w-16 p-1">
                    <img
                      src={userProfileInformation.avatar_url}
                      alt="Avatar Tailwind CSS Component"
                      class="mask mask-squircle"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div tabindex="0" class="dropdown-content py-2">
              <div
                class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
              >
                <div class="card-body">
                  <h2 class="card-title font-extrabold capitalize">
                    avatar component
                  </h2>
                  <p class="text-neutral-content text-sm text-opacity-80">
                    Use avatar component with any size
                  </p>
                  <div class="mt-4 flex justify-end">
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
      </div>
      <!-- Cell 3 -->
      <div class="bg-teal-400 row-span-3">
        <UserLocationCard {userProfileInformation} />
      </div>
      <!-- Cell 4 -->
      <div class="bg-teal-400 row-span-6">
        <UserResponsesCard
          {userProfileInformation}
          userResponses={[
            {
              name: 'university',
              label: 'University',
              icon: 'graduation-cap',
              value: userProfileInformation.user_responses.university
            },
            {
              name: 'major',
              label: 'Major',
              icon: 'book',
              value: userProfileInformation.user_responses.major
            },
            {
              name: 'phone',
              label: 'Phone',
              icon: 'phone',
              value: userProfileInformation.user_responses.phone
            }
          ]}
        />
      </div>
      <!-- Cell 5 -->
      <div class="bg-teal-400 row-span-3">
        <UserResponsesCard
          {userProfileInformation}
          userResponses={[
            {
              name: 'interests',
              label: 'Interests',
              icon: 'heart',
              value: userProfileInformation.user_responses.interests
            },
            {
              name: 'expression',
              label: 'Spotify',
              icon: 'spotify',
              value: userProfileInformation.user_responses.expression
            },
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
            }
          ]}
        />
      </div>
      <!-- Cell 6 -->
      <div class="bg-teal-400 row-span-3">
        <UserMenuItems {userProfileInformation} />
      </div>

      <!-- Cell 7 -->
      <div class="bg-teal-400 row-span-4">
        <UserStatsInfoOptions {userProfileInformation} />
      </div>
      <!-- Cell 8 -->
      <div class="bg-teal-400 row-span-2">7</div>
      <!-- 
      
      
      <div
        class="card card-compact xl:card-normal bg-base-100 col-span-3 row-span-4 mx-2 w-72 flex-shrink-0 overflow-visible shadow-xl xl:mx-0 xl:w-auto"
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
          <div tabindex="0" class="dropdown-content py-2">
            <div
              class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
            >
              <div class="card-body">
                <h2 class="card-title font-extrabold capitalize">
                  card component
                </h2>
                <p class="text-neutral-content text-sm text-opacity-80">
                  Card component is used to show products, features and more.
                </p>
                <div class="mt-4 flex justify-end">
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
          <div class="card-title flex items-center font-extrabold">
            Card Component
            <div class="dropdown dropdown-top dropdown-end">
              <div tabindex="0">
                <div
                  tabindex="0"
                  class="btn btn-ghost text-info btn-xs btn-circle mx-1 inline-block"
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline h-5 w-5 stroke-current"
                    ><path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    /></svg
                  >
                </div>
              </div>
              <div tabindex="0" class="dropdown-content py-2">
                <div
                  class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
                >
                  <div class="card-body">
                    <h2 class="card-title font-extrabold capitalize">
                      dropdown component
                    </h2>
                    <p class="text-neutral-content text-sm text-opacity-80">
                      helper dropdown can show an element when focused.
                    </p>
                    <div class="mt-4 flex justify-end">
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
          <div class="dropdown w-full">
            <div tabindex="0">
              <div class="mb-2">
                <div class="badge badge-ghost">May 14th</div>
              </div>
            </div>
            <div tabindex="0" class="dropdown-content py-2">
              <div
                class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
              >
                <div class="card-body">
                  <h2 class="card-title font-extrabold capitalize">
                    badge component
                  </h2>
                  <p class="text-neutral-content text-sm text-opacity-80">
                    Use badge component to highlight small inline items
                  </p>
                  <div class="mt-4 flex justify-end">
                    <a
                      href="/components/badge"
                      class="btn btn-primary btn-sm xl:btn-md">See component</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="text-base-content text-sm text-opacity-80">
            Use card component to easily show blog posts, products, features,
            items and more.
          </p>
          <div class="card-actions justify-end">
            <div class="dropdown dropdown-top dropdown-end">
              <div tabindex="0">
                <button class="btn btn-primary">Get Started</button>
              </div>
              <div tabindex="0" class="dropdown-content py-2">
                <div
                  class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
                >
                  <div class="card-body">
                    <h2 class="card-title font-extrabold capitalize">
                      button component
                    </h2>
                    <p class="text-neutral-content text-sm text-opacity-80">
                      Buttons come in various shapes, colors and sizes
                    </p>
                    <div class="mt-4 flex justify-end">
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
        class="bg-base-100 text-base-content rounded-box col-span-3 row-span-4 mx-2 grid w-72 flex-shrink-0 shadow-xl xl:mx-0 xl:w-auto xl:place-self-stretch"
      >
        <div class="grid w-full grid-cols-1 gap-4 p-4">
          <div class="dropdown">
            <div tabindex="0">
              <div class="grid w-full grid-cols-2 gap-4">
                <button class="btn btn-block">Neutral</button>
                <button class="btn btn-primary btn-block">primary</button>
                <button class="btn btn-secondary btn-block">secondary</button>
                <button class="btn btn-accent btn-block">accent</button>
                <button class="btn btn-info btn-block">info</button>
                <button class="btn btn-success btn-block">success</button>
              </div>
            </div>
            <div tabindex="0" class="dropdown-content py-2">
              <div
                class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
              >
                <div class="card-body">
                  <h2 class="card-title font-extrabold capitalize">
                    button component
                  </h2>
                  <p class="text-neutral-content text-sm text-opacity-80">
                    Buttons come in various shapes, colors and sizes
                  </p>
                  <div class="mt-4 flex justify-end">
                    <a
                      href="/components/button"
                      class="btn btn-primary btn-sm xl:btn-md">See component</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown dropdown-top">
            <div tabindex="0">
              <div class="grid w-full grid-cols-2 gap-4">
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
            <div tabindex="0" class="dropdown-content py-2">
              <div
                class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
              >
                <div class="card-body">
                  <h2 class="card-title font-extrabold capitalize">
                    button component
                  </h2>
                  <p class="text-neutral-content text-sm text-opacity-80">
                    Buttons come in various shapes, colors and sizes
                  </p>
                  <div class="mt-4 flex justify-end">
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
        class="col-span-3 row-span-2 mx-2 grid w-72 flex-shrink-0 gap-4 xl:mx-0 xl:w-auto"
      >
        <div class="dropdown dropdown-end dropdown-top">
          <div tabindex="0">
            <div class="grid gap-4">
              <div class="btn-group flex">
                <button class="btn flex-1">1</button>
                <button class="btn btn-active flex-1">2</button>
                <button class="btn flex-1">3</button>
                <button class="btn flex-1">4</button>
                <button class="btn flex-1">5</button>
              </div>
              <div class="btn-group flex">
                <button class="btn btn-outline flex-1">1</button>
                <button class="btn btn-outline flex-1">2</button>
                <button class="btn btn-outline flex-1">3</button>
                <button class="btn btn-outline flex-1">4</button>
                <button class="btn btn-outline flex-1">5</button>
              </div>
            </div>
          </div>
          <div tabindex="0" class="dropdown-content py-2">
            <div
              class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
            >
              <div class="card-body">
                <h2 class="card-title font-extrabold capitalize">
                  pagination component
                </h2>
                <p class="text-neutral-content text-sm text-opacity-80">
                  Pagination buttons in many colors and sizes!
                </p>
                <div class="mt-4 flex justify-end">
                  <a
                    href="/components/pagination"
                    class="btn btn-primary btn-sm xl:btn-md">See component</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-end dropdown-top">
          <div tabindex="0">
            <div class="tabs tabs-boxed items-center">
              <button class="tab flex-1">Tab 1</button>
              <button class="tab tab-active flex-1">Tab 2</button>
              <button class="tab flex-1">Tab 3</button>
            </div>
          </div>
          <div tabindex="0" class="dropdown-content py-2">
            <div
              class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
            >
              <div class="card-body">
                <h2 class="card-title font-extrabold capitalize">
                  tab component
                </h2>
                <p class="text-neutral-content text-sm text-opacity-80">
                  Tab component with several sizes and styles
                </p>
                <div class="mt-4 flex justify-end">
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
        class="col-span-3 row-span-1 mx-2 grid w-72 flex-shrink-0 gap-4 xl:mx-0 xl:w-auto"
      >
        <div class="bg-base-100 text-base-content rounded-box shadow-xl">
          <div class="dropdown dropdown-end dropdown-top w-full">
            <div tabindex="0">
              <div class="flex justify-center gap-8 p-4">
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
            <div tabindex="0" class="dropdown-content py-2">
              <div
                class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
              >
                <div class="card-body">
                  <h2 class="card-title font-extrabold capitalize">
                    checkbox component
                  </h2>
                  <p class="text-neutral-content text-sm text-opacity-80">
                    Colorful, animated and accessible
                  </p>
                  <div class="mt-4 flex justify-end">
                    <a
                      href="/components/checkbox"
                      class="btn btn-primary btn-sm xl:btn-md">See component</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown dropdown-end w-full">
            <div tabindex="0">
              <div
                class="rating rating-lg rating-half w-full justify-center px-4 pb-4"
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
                  class="mask mask-star-2 mask-half-1 bg-green-500"
                />
                <input
                  type="radio"
                  aria-label="Rating 1 star"
                  name="rating-10"
                  class="mask mask-star-2 mask-half-2 bg-green-500"
                />
                <div class="w-1" />
                <input
                  type="radio"
                  aria-label="Rating 1 and half star"
                  name="rating-10"
                  class="mask mask-star-2 mask-half-1 bg-green-500"
                />
                <input
                  type="radio"
                  aria-label="Rating 2 star"
                  name="rating-10"
                  class="mask mask-star-2 mask-half-2 bg-green-500"
                />
                <div class="w-1" />
                <input
                  type="radio"
                  aria-label="Rating 2 and half star"
                  name="rating-10"
                  class="mask mask-star-2 mask-half-1 bg-green-500"
                />
                <input
                  type="radio"
                  aria-label="Rating 3 star"
                  name="rating-10"
                  class="mask mask-star-2 mask-half-2 bg-green-500"
                />
                <div class="w-1" />
                <input
                  type="radio"
                  aria-label="Rating 3 and half star"
                  name="rating-10"
                  class="mask mask-star-2 mask-half-1 bg-green-500"
                />
                <input
                  type="radio"
                  aria-label="Rating 4 star"
                  name="rating-10"
                  class="mask mask-star-2 mask-half-2 bg-green-500"
                />
                <div class="w-1" />
                <input
                  type="radio"
                  aria-label="Rating 4 and half star"
                  name="rating-10"
                  class="mask mask-star-2 mask-half-1 bg-green-500"
                />
                <input
                  type="radio"
                  aria-label="Rating 5 star"
                  name="rating-10"
                  class="mask mask-star-2 mask-half-2 bg-green-500"
                />
              </div>
            </div>
            <div tabindex="0" class="dropdown-content py-2">
              <div
                class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
              >
                <div class="card-body">
                  <h2 class="card-title font-extrabold capitalize">
                    Rating component
                  </h2>
                  <p class="text-neutral-content text-sm text-opacity-80">
                    Styled radio buttons
                  </p>
                  <div class="mt-4 flex justify-end">
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
        class="col-span-3 row-span-1 mx-2 grid w-72 flex-shrink-0 gap-4 xl:mx-0 xl:w-auto"
      >
        <div
          class="bg-neutral text-neutral-content rounded-box flex items-center shadow-xl"
        >
          <div class="dropdown dropdown-top">
            <div tabindex="0">
              <div class="breadcrumbs px-4 text-sm">
                <ul>
                  <li>
                    <a href="/"
                      ><svg
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="mr-2 h-4 w-4 stroke-current"
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
                        class="mr-2 h-4 w-4 stroke-current"
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
            <div tabindex="0" class="dropdown-content py-2">
              <div
                class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
              >
                <div class="card-body">
                  <h2 class="card-title font-extrabold capitalize">
                    breadcrumbs component
                  </h2>
                  <p class="text-neutral-content text-sm text-opacity-80">
                    Make a better navigation with breadcrumbs!
                  </p>
                  <div class="mt-4 flex justify-end">
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
          class="bg-accent text-accent-content rounded-box flex items-center p-4 shadow-xl"
        >
          <div class="flex-1 px-2">
            <h2 class="text-3xl font-extrabold">4,600</h2>
            <p class="text-sm text-opacity-80">Page views</p>
          </div>
          <div class="flex-0">
            <div class="dropdown dropdown-top dropdown-end">
              <div tabindex="0">
                <div class="flex space-x-1">
                  <button
                    aria-label="button component"
                    class="btn btn-ghost btn-square"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block h-6 w-6 stroke-current"
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
                    class="btn btn-ghost btn-square"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block h-6 w-6 stroke-current"
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
              <div tabindex="0" class="dropdown-content py-2">
                <div
                  class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
                >
                  <div class="card-body">
                    <h2 class="card-title font-extrabold capitalize">
                      button component
                    </h2>
                    <p class="text-neutral-content text-sm text-opacity-80">
                      Buttons come in various shapes, colors and sizes
                    </p>
                    <div class="mt-4 flex justify-end">
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
        class="card bg-base-100 col-span-3 row-span-1 mx-2 w-72 flex-shrink-0 overflow-visible shadow-lg xl:mx-0 xl:w-auto xl:place-self-stretch"
      >
        <div class="card-body flex-row items-center space-x-4 px-4">
          <div class="flex-1">
            <h2 class="card-title mb-0 flex">
              <div class="dropdown dropdown-top">
                <div tabindex="0">
                  <button
                    aria-label="loading button"
                    class="btn btn-ghost loading btn-sm btn-circle"
                  />
                </div>
                <div tabindex="0" class="dropdown-content py-2">
                  <div
                    class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
                  >
                    <div class="card-body">
                      <h2 class="card-title font-extrabold capitalize">
                        loading button component
                      </h2>
                      <p class="text-neutral-content text-sm text-opacity-80">
                        Buttons can get loadings state using a simple class
                      </p>
                      <div class="mt-4 flex justify-end">
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
            <div class="dropdown dropdown-top w-full">
              <div tabindex="0">
                <progress
                  max="100"
                  class="progress progress-secondary"
                  value="70"
                />
              </div>
              <div tabindex="0" class="dropdown-content py-2">
                <div
                  class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
                >
                  <div class="card-body">
                    <h2 class="card-title font-extrabold capitalize">
                      progress component
                    </h2>
                    <p class="text-neutral-content text-sm text-opacity-80">
                      Show progressbar, loadings or simple bar charts using
                      progress component
                    </p>
                    <div class="mt-4 flex justify-end">
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
            <div class="dropdown dropdown-top dropdown-end">
              <div tabindex="0">
                <button
                  aria-label="circle button component"
                  class="btn btn-circle"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block h-6 w-6 stroke-current"
                    ><path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    /></svg
                  ></button
                >
              </div>
              <div tabindex="0" class="dropdown-content py-2">
                <div
                  class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
                >
                  <div class="card-body">
                    <h2 class="card-title font-extrabold capitalize">
                      button component
                    </h2>
                    <p class="text-neutral-content text-sm text-opacity-80">
                      Buttons come in various shapes, colors and sizes
                    </p>
                    <div class="mt-4 flex justify-end">
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
      </div> -->
    </div>
  </div>
</div>
<!-- <div class="divider divider-horizontal">OR</div> -->
