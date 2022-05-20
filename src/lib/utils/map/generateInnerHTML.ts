import type { FetchedLocation } from '$lib/types/FetchedLocation';
import { listOfPeopleOnHover } from './generateInnerHTML/listOfPeopleOnHover';
import { stackOfIcons } from './stackOfIcons';

export function generateInnerHTML(fetchedLocation: FetchedLocation) {
  // Get 3 random people from the 'people' property of fetchedLocation
  const shuffledPeople = fetchedLocation.people.sort(() => 0.5 - Math.random());

  // Three cases for the number of people in the fetchedLocation
  if (shuffledPeople.length === 0) return '';
  return `<div class="dropdown dropdown-hover">
  ${stackOfIcons(shuffledPeople, fetchedLocation)}
  ${listOfPeopleOnHover(shuffledPeople, fetchedLocation)}
</div>`;
}
