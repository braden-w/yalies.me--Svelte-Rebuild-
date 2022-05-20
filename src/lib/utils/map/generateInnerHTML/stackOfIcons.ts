import { FetchedLocation, Person } from '$lib/types/FetchedLocation';

export function stackOfIcons(
  shuffledPeople: Person[],
  fetchedLocation: FetchedLocation
): string {
  return `<label tabindex="0" name="selected" class="stack">
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
  </label>`;
}
