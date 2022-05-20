import type { definitions } from '$lib/types/supabase';

interface Person {
  id: string;
  name: string;
  avatar_url: string;
}

interface PersonFromFacebook {
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  image: string;
  year: number;
}

export function generateInnerHTML<T extends Person | PersonFromFacebook>(
  place: definitions['places_with_people']
) {
  // Get 3 random people from the 'people' property of placeWithPeople
  const people = place.people as unknown as T[];
  /**The first three people who will be the icons in the stack on the map */
  const stackIcons = people
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((person) => {
      return (<Person>person).avatar_url ?? (<PersonFromFacebook>person).image;
    });
  const { place_id, description } = place;

  // Three cases for the number of people in the placeWithPeople
  if (stackIcons.length === 0) return '';
  return `<div class="dropdown dropdown-hover">
  ${generateStackOfIcons({
    threeAvatars: stackIcons,
    indicator: people.length
  })}
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
  threeAvatars,
  indicator
}: {
  threeAvatars: string[];
  indicator: number;
}): string {
  return `<label tabindex="0" name="selected" class="stack">
    <div class="avatar indicator">
      <span class="indicator-item badge badge-secondary"
        >${indicator}</span
      >
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${threeAvatars[0]}"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
    ${
      threeAvatars.length >= 2
        ? `
    <div class="avatar">
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${threeAvatars[1]}"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
    `
        : ''
    } ${
    threeAvatars.length >= 3
      ? `
    <div class="avatar">
      <div class="w-8 h-8 rounded-lg outline-on-click">
        <img
          src="${threeAvatars[2]}"
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
function generateHover<T extends Person | PersonFromFacebook>({
  numberOfIconsStacked,
  place_id,
  description,
  people
}: {
  numberOfIconsStacked: number;
  place_id: string;
  description: string;
  people: T[];
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
