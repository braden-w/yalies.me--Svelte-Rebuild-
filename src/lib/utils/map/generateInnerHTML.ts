import type { definitions } from '$lib/types/supabase';

interface Person {
  id: string;
  name: string;
  avatar_url: string;
}

export function generateInnerHTML(place: definitions['places_with_people']) {
  // Get 3 random people from the 'people' property of placeWithPeople
  const people = place.people as unknown as Person[];
  const stackIcons = people.sort(() => 0.5 - Math.random()).slice(0, 3);
  const { place_id, description } = place;

  // Three cases for the number of people in the placeWithPeople
  if (stackIcons.length === 0) return '';
  return `<div class="dropdown dropdown-hover">
  ${stackOfIcons(stackIcons, people)}
  ${listOfPeopleOnHover(stackIcons, { place_id, description }, people)}
</div>`;
}

function stackOfIcons(stackIcons: Person[], people: Person[]): string {
  return `<label tabindex="0" name="selected" class="stack">
    <div class="avatar indicator">
      <span class="indicator-item badge badge-secondary"
        >${people.length}</span
      >
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${stackIcons[0].avatar_url}"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
    ${
      stackIcons.length >= 2
        ? `
    <div class="avatar">
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${stackIcons[1].avatar_url}"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
    `
        : ''
    } ${
    stackIcons.length >= 3
      ? `
    <div class="avatar">
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${stackIcons[2].avatar_url}"
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
