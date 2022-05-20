import type { definitions } from '$lib/types/supabase';

interface Person {
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  image: string;
  year: number;
}

export function generateInnerHTML(place: definitions['places_with_facebook']) {
  // Get 3 random people from the 'people' property of placeWithPeople
  const people = place.people as unknown as Person[];
  /**The first three people who will be the icons in the stack on the map */
  const stackIcons = people.sort(() => 0.5 - Math.random()).slice(0, 3);
  const { place_id, description } = place;

  // Three cases for the number of people in the placeWithPeople
  if (stackIcons.length === 0) return '';
  return `<div class="dropdown dropdown-hover">
  ${generateStackOfIcons({ threePeople: stackIcons, indicator: people.length })}
  ${generateHover({
    numberOfIconsStacked: stackIcons.length,
    place_id: place_id ?? '',
    description: description ?? '',
    people
  })}
</div>`;
}

/**Generates a stack of icons with three random people and an indicator in the top right for overall number of people at a location */
function generateStackOfIcons({
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
function generateHover({
  numberOfIconsStacked,
  place_id,
  description,
  people
}: {
  numberOfIconsStacked: number;
  place_id: string;
  description: string;
  people: Person[];
}): string {
  const placeTitle = `<li>
      <a class="justify-between" href="/places/${place_id}">
        ${description}
      </a>
    </li>`;
  return `<ul tabindex="0" class="menu menu-compact dropdown-content mt-${
    numberOfIconsStacked > 3 ? '3' : numberOfIconsStacked
  } p-2 shadow bg-base-100 rounded-box w-52">
    ${placeTitle} 
    ${peopleToListItems(people)}
  </ul>`;
}

function peopleToListItems(people: Person[]): string {
  return people
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
    .join('');
}
