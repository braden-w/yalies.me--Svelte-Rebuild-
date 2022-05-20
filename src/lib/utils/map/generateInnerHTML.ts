import type { definitions } from '$lib/types/supabase';

interface Person {
  id: string;
  name: string;
  avatar_url: string;
}

export function generateInnerHTML(place: definitions['places_with_people']) {
  // Get 3 random people from the 'people' property of placeWithPeople
  const people = place.people as unknown as Person[];
  /**The first three people who will be the icons in the stack on the map */
  const stackIcons = people.sort(() => 0.5 - Math.random()).slice(0, 3);
  const { place_id, description } = place;

  // Three cases for the number of people in the placeWithPeople
  if (stackIcons.length === 0) return '';
  return `<div class="dropdown dropdown-hover">
  ${stackOfIcons({ threePeople: stackIcons, indicator: people.length })}
  ${listOfPeopleOnHover(stackIcons, { place_id, description }, peopleAtPlace)}
</div>`;
}

function stackOfIcons({
  threePeople,
  indicator
}: {
  threePeople: Person[];
  indicator: number;
}): string {
  return `<label tabindex="0" name="selected" class="stack">
    <div class="avatar indicator">
      <span class="indicator-item badge badge-secondary"
        >${indicator}</span
      >
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${threePeople[0].avatar_url}"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
    ${
      threePeople.length >= 2
        ? `
    <div class="avatar">
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${threePeople[1].avatar_url}"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
    `
        : ''
    } ${
    threePeople.length >= 3
      ? `
    <div class="avatar">
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${threePeople[2].avatar_url}"
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
  stackIcons: Person[],
  { place_id, description }: { place_id: string; description: string },
  people: Person[]
): string {
  const placeTitle = `<li>
      <a class="justify-between" href="/places/${place_id}">
        ${description}
      </a>
    </li>`;
  return `<ul tabindex="0" class="menu menu-compact dropdown-content mt-${
    stackIcons.length > 3 ? '3' : stackIcons.length
  } p-2 shadow bg-base-100 rounded-box w-52">
    ${placeTitle} 
    ${people.map(personToListItem).join('')}
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
