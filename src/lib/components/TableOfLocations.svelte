<script lang="ts">
  import type { definitionsJSON, Person } from '$lib/types/definitionsJSON';

  import { supabase } from '$lib/utils/supabaseClient';

  let promise = supabase
    .from<definitionsJSON['places_with_people']>('places_with_people')
    .select('*')
    .not('people', 'is', null);
  function getPeople(place: definitionsJSON['places_with_people']) {
    return place.people?.map((person) => (<Person>person).name);
  }
</script>

<div
  class="col-span-3 row-span-2 mx-2 grid w-72 flex-shrink-0 gap-4 xl:mx-0 xl:w-full xl:place-self-stretch"
/>
{#await promise}
  Loading...
{:then { data: places }}
  {#if places}
    <div class="rounded-box bg-base-100 text-base-content shadow-xl">
      <ul class="menu overflow-visible p-3">
        <li class="menu-title">
          <span>Places</span>
        </li>
        {#each places as place}
          <li>
            <a href={`/places/${place.place_id}`}>
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="mr-2 inline-block h-5 w-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              {place.description}
              {#if getPeople(place)}
                {#each getPeople(place) as person}
                  {person}
                {/each}
              {/if}
            </a>
          </li>
        {/each}
        <li>
          <button>
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="mr-2 inline-block h-5 w-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Menu Item 2</button
          >
        </li>
        <li>
          <button>
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="mr-2 inline-block h-5 w-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            Menu Item 3
            <div class="badge badge-success">new</div>
          </button>
        </li>
      </ul>
    </div>
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th> People </th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        {#each places as place, index}
          <tr class="hover" id={place.place_id}>
            <th>
              {index + 1}
            </th>
            <td> {place.description} </td>
            <td> {getPeople(place)} </td>
            <th>
              <a
                href={`/places/${place.place_id}`}
                class="btn btn-primary btn-md"
              >
                Go to Place
              </a>
            </th>
          </tr>
        {/each}
      </tbody>
      <!-- foot -->
      <tfoot />
    </table>
  {/if}
{:catch name}
  {name}
{/await}
