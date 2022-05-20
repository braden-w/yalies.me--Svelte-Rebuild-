import type { FetchedLocation, Person } from '$lib/types/FetchedLocation';
import { personToListItem } from './personToListItem';

/**Generates the dropdown menu that is created when you hover on a component */
export function listOfPeopleOnHover(
  shuffledPeople: Person[],
  fetchedLocation: FetchedLocation
): string {
  const placeTitle = `<li>
      <a class="justify-between" href="/places/${fetchedLocation.place_id}">
        ${fetchedLocation.description}
      </a>
    </li>`;
  return `<ul tabindex="0" class="menu menu-compact dropdown-content mt-${
    shuffledPeople.length > 3 ? '3' : shuffledPeople.length
  } p-2 shadow bg-base-100 rounded-box w-52">
    ${placeTitle} 
    ${fetchedLocation.people.map(personToListItem).join('')}
  </ul>`;
}
