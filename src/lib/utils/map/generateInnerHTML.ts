import type { FetchedLocation, Person } from '$lib/types/FetchedLocation';

/**Generates the dropdown menu that is created when you hover on a component */
function generateHoverList(
  shuffledPeople: Person[],
  fetchedLocation: FetchedLocation
): string {
  return `<ul
    tabindex="0"
    class="menu menu-compact dropdown-content mt-${
      shuffledPeople.length > 3 ? '3' : shuffledPeople.length
    } p-2 shadow bg-base-100 rounded-box w-52"
  >
    <li>
      <a class="justify-between" href="/places/${fetchedLocation.place_id}">
        ${fetchedLocation.description}
      </a>
    </li>
    ${fetchedLocation.people
      .map(
        (person) => `<li>
      <a class="content-center" href="/users/${person.id}">
        <div class="avatar">
          <div class="w-8 rounded-lg">
            <img src="${person.avatar_url}" referrerpolicy="no-referrer" />
          </div>
        </div>
        <span class="text-xs">${person.name}</span>
      </a>
    </li>`
      )
      .join('')}
  </ul>`;
}

export function generateInnerHTML(fetchedLocation: FetchedLocation) {
  // Get 3 random people from the 'people' property of fetchedLocation
  const shuffledPeople = fetchedLocation.people.sort(() => 0.5 - Math.random());

  // Three cases for the number of people in the fetchedLocation
  if (shuffledPeople.length === 0) return '';
  return `<div class="dropdown dropdown-hover">
  <label tabindex="0" name="selected" class="stack">
    <div class="avatar indicator">
      <span class="indicator-item badge badge-secondary"
        >${fetchedLocation.people.length}</span
      >
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${fetchedLocation.people[0].avatar_url}"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
    ${
      shuffledPeople.length >= 2
        ? `
    <div class="avatar">
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${fetchedLocation.people[1].avatar_url}"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
    `
        : ''
    } ${
    shuffledPeople.length >= 3
      ? `
    <div class="avatar">
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${fetchedLocation.people[2].avatar_url}"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
    `
      : ''
  }
  </label>
  ${generateHoverList(shuffledPeople, fetchedLocation)}
</div>`;
}
