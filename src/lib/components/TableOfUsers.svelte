<script lang="ts">
  import type { PlaceInformation } from 'src/routes/places/[place_id].svelte';

  export let users: PlaceInformation['users_in_place'];
</script>

<table class="table w-full">
  <!-- head -->
  <thead>
    <tr>
      <th>
        <label>
          <input type="checkbox" class="checkbox" />
        </label>
      </th>
      <th>Name</th>
      <th>Job</th>
      <th>Favorite Color</th>
      <th />
    </tr>
  </thead>
  <tbody>
    <!-- row 1 -->
    {#each users as user}
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img
                  src={user.avatar_url}
                  alt="User Profile"
                  referrerpolicy="no-referrer"
                />
              </div>
            </div>
            <div>
              <div class="font-bold">{user.name}</div>
              <div class="text-sm opacity-50">{user.id}</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span class="badge badge-sm badge-ghost"
            >Desktop Support Technician</span
          >
        </td>
        <td>Purple</td>
        <th>
          <a href={`/users/${user.id}`} class="btn btn-ghost btn-xs">
            details
          </a>
        </th>
      </tr>
    {/each}
  </tbody>
  <!-- foot -->
  <tfoot />
</table>
