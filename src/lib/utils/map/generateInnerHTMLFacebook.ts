import type { FetchedLocation, Person } from '$lib/types/FetchedLocation';
import type { definitions } from '$lib/types/supabase';

interface Person {
  email: string
  first_name: string
  middle_name: string
  last_name: string
  image: string
  year: number
}

export function generateInnerHTMLFacebook(
  facebookToPlace: definitions['facebook_to_places']
): string {
  // Get 3 random people from the 'people' property of facebookToPlace
  const people = facebookToPlace.people as Person[];
  const shuffledPeople = sort(() => 0.5 - Math.random());

  // Three cases for the number of people in the facebookToPlace
  if (shuffledPeople.length === 0) return '';
  return `<div class="dropdown dropdown-hover">
  ${stackOfIcons(shuffledPeople, facebookToPlace)}
  ${listOfPeopleOnHover(shuffledPeople, facebookToPlace)}
</div>`;
}

function stackOfIcons(
  shuffledPeople: Person[],
  facebookToPlace: FetchedLocation
): string {
  return `<label tabindex="0" name="selected" class="stack">
    <div class="avatar indicator">
      <span class="indicator-item badge badge-secondary"
        >${facebookToPlace.people.length}</span
      >
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${facebookToPlace.people[0].avatar_url}"
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
          src="${facebookToPlace.people[1].avatar_url}"
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
          src="${facebookToPlace.people[2].avatar_url}"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
    `
      : ''
  }
  </label>`;
}

/**Generates the dropdown menu that is created when you hover on a component */
function listOfPeopleOnHover(
  shuffledPeople: Person[],
  facebookToPlace: FetchedLocation
): string {
  const placeTitle = `<li>
      <a class="justify-between" href="/places/${facebookToPlace.place_id}">
        ${facebookToPlace.description}
      </a>
    </li>`;
  return `<ul tabindex="0" class="menu menu-compact dropdown-content mt-${
    shuffledPeople.length > 3 ? '3' : shuffledPeople.length
  } p-2 shadow bg-base-100 rounded-box w-52">
    ${placeTitle} 
    ${facebookToPlace.people.map(personToListItem).join('')}
  </ul>`;
}

function personToListItem(person: Person): string {
  return `<li>
      <a class="content-center" href="/users/${person.id}">
        <div class="avatar">
          <div class="w-8 rounded-lg">
            <img src="${person.avatar_url}" referrerpolicy="no-referrer" />
          </div>
        </div>
        <span class="text-xs">${person.name}</span>
      </a>
    </li>`;
}
