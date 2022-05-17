<script lang="ts">
  import { supabase } from '$lib/utils/supabaseClient';
  import { sessionStore } from '$lib/utils/sessionStore';
  import type { definitions } from '$lib/supabase';

  let query = '';
  let loading = false;
  let results: google.maps.places.AutocompletePrediction[] = [];
  function resetResults() {
    results = [
      {
        description: 'New Haven, CT, USA',
        matched_substrings: [
          {
            length: 9,
            offset: 0
          }
        ],
        place_id: 'ChIJ5XCAOkTY54kR7WSyWcZUo_Y',
        structured_formatting: {
          main_text: 'New Haven',
          main_text_matched_substrings: [
            {
              length: 9,
              offset: 0
            }
          ],
          secondary_text: 'CT, USA'
        },
        terms: [
          {
            offset: 0,
            value: 'New Haven'
          },
          {
            offset: 11,
            value: 'CT'
          },
          {
            offset: 15,
            value: 'USA'
          }
        ],
        types: ['locality', 'political', 'geocode']
      },
      {
        description: 'New York, NY, USA',
        matched_substrings: [
          {
            length: 8,
            offset: 0
          }
        ],
        place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
        structured_formatting: {
          main_text: 'New York',
          main_text_matched_substrings: [
            {
              length: 8,
              offset: 0
            }
          ],
          secondary_text: 'NY, USA'
        },
        terms: [
          {
            offset: 0,
            value: 'New York'
          },
          {
            offset: 10,
            value: 'NY'
          },
          {
            offset: 14,
            value: 'USA'
          }
        ],
        types: ['locality', 'political', 'geocode']
      },
      {
        description: 'Los Angeles, CA, USA',
        matched_substrings: [
          {
            length: 8,
            offset: 0
          }
        ],
        place_id: 'ChIJE9on3F3HwoAR9AhGJW_fL-I',
        structured_formatting: {
          main_text: 'Los Angeles',
          main_text_matched_substrings: [
            {
              length: 8,
              offset: 0
            }
          ],
          secondary_text: 'CA, USA'
        },
        terms: [
          {
            offset: 0,
            value: 'Los Angeles'
          },
          {
            offset: 13,
            value: 'CA'
          },
          {
            offset: 17,
            value: 'USA'
          }
        ],
        types: ['locality', 'political', 'geocode']
      },
      {
        description: 'San Francisco, CA, USA',
        matched_substrings: [
          {
            length: 8,
            offset: 0
          }
        ],
        place_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
        structured_formatting: {
          main_text: 'San Francisco',
          main_text_matched_substrings: [
            {
              length: 8,
              offset: 0
            }
          ],
          secondary_text: 'CA, USA'
        },
        terms: [
          {
            offset: 0,
            value: 'San Francisco'
          },
          {
            offset: 15,
            value: 'CA'
          },
          {
            offset: 19,
            value: 'USA'
          }
        ],
        types: ['locality', 'political', 'geocode']
      },
      {
        description: 'Boston, MA, USA',
        matched_substrings: [
          {
            length: 6,
            offset: 0
          }
        ],
        place_id: 'ChIJGzE9DS1l44kRoOhiASS_fHg',
        structured_formatting: {
          main_text: 'Boston',
          main_text_matched_substrings: [
            {
              length: 6,
              offset: 0
            }
          ],
          secondary_text: 'MA, USA'
        },
        terms: [
          {
            offset: 0,
            value: 'Boston'
          },
          {
            offset: 8,
            value: 'MA'
          },
          {
            offset: 12,
            value: 'USA'
          }
        ],
        types: ['locality', 'political', 'geocode']
      },
      {
        description: 'Washington D.C., DC, USA',
        matched_substrings: [
          {
            length: 10,
            offset: 0
          }
        ],
        place_id: 'ChIJW-T2Wt7Gt4kRKl2I1CJFUsI',
        reference: 'ChIJW-T2Wt7Gt4kRKl2I1CJFUsI',
        structured_formatting: {
          main_text: 'Washington D.C.',
          main_text_matched_substrings: [
            {
              length: 10,
              offset: 0
            }
          ],
          secondary_text: 'DC, USA'
        },
        terms: [
          {
            offset: 0,
            value: 'Washington D.C.'
          },
          {
            offset: 17,
            value: 'DC'
          },
          {
            offset: 21,
            value: 'USA'
          }
        ],
        types: ['locality', 'political', 'geocode']
      }
    ];
  }
  resetResults();

  supabase
    .from<definitions['users']>('users')
    .select('user_responses(places(place_id, description))')
    .eq('id', $sessionStore?.id)
    .maybeSingle()
    .then(({ data, error }) => {
      if (data) {
        const typed_data = data as unknown as {
          user_responses: { places: { place_id: string; description: string } };
        };
        query = typed_data.user_responses.places.description;
        results = [];
      }
      if (error) {
        console.error(error);
      }
    });

  // When query changes value
  let timer: NodeJS.Timeout | null;
  function handleQueryChange() {
    if (query.length == 0) {
      const user_response_id = $sessionStore?.user_response_id;
      supabase.from('user_responses').upsert(
        { place_id: null, user_response_id },
        {
          returning: 'minimal' // Don't return the value after inserting
        }
      );
    }
    if (query.length < 2) {
      resetResults();
    } else {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fetchResults();
      }, 300);
    }
  }

  // Fetch results from the Google Places API
  function fetchResults() {
    loading = true;
    const sessionToken = new google.maps.places.AutocompleteSessionToken();
    const service = new google.maps.places.AutocompleteService();
    const request: google.maps.places.AutocompletionRequest = {
      input: query,
      sessionToken,
      types: ['(cities)']
    };
    service.getPlacePredictions(request, (response, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        loading = false;
        results = response ?? [];
        console.log(results);
      }
      loading = false;
    });
  }

  async function handleClick(
    clicked: google.maps.places.AutocompletePrediction
  ) {
    try {
      query = clicked.description;
      // Upload the place_id and description props to supabase
      const { place_id, description } = clicked;

      // Get the latitude and longitude from place_id using the Google Places API
      const geocoder = new google.maps.Geocoder();

      const { results } = await geocoder.geocode({ placeId: place_id });

      // Get lat and lng from results
      const { geometry } = results[0];
      const { location } = geometry;
      const { lat: latFunction, lng: lngFunction } = location;
      const lat = latFunction();
      const lng = lngFunction();

      // Upload place to places in Supabase
      const payload = {
        place_id,
        description,
        geog: `SRID=4326;POINT(${lng} ${lat})`
      };
      console.log(payload);
      const { error: errorPlaces } = await supabase
        .from('places')
        .upsert(payload, {
          returning: 'minimal' // Don't return the value after inserting
        });
      if (errorPlaces) throw errorPlaces;

      const user_response_id = $sessionStore?.user_response_id;
      const { error: errorUserIDtoPlaceID } = await supabase
        .from('user_responses')
        .upsert(
          { place_id, user_response_id },
          {
            returning: 'minimal' // Don't return the value after inserting
          }
        );

      if (errorUserIDtoPlaceID) throw errorUserIDtoPlaceID;
    } catch (error: any) {
      alert(error.message);
    }
  }
</script>

<svelte:head>
  <script
    async
    defer
    type="text/javascript"
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZFzojqVe47aB3f_QwnU9IKaCZEbeuG0A&libraries=places">
  </script>
</svelte:head>

<!-- A Location Autocomplete built with DaisyUI that uses the Google Map Places API to autocomplete the location as the user is typing -->

<div class="dropdown dropdown-top w-full">
  <div class="form-control">
    <label class="label" for="location">
      <span class="label-text">I'm currently in...</span>
    </label>
    <input
      tabindex="0"
      type="text"
      id="location"
      class="input input-bordered"
      placeholder="Start typing your city here..."
      bind:value={query}
      on:input={handleQueryChange}
    />
  </div>

  <!-- For each result in results, display  -->
  {#if results.length > 0}
    <ul
      class="menu menu-compact dropdown-content  shadow bg-base-100 rounded-box text-md w-full"
      tabindex="0"
    >
      {#each results as result}
        <li on:click={handleClick(result)}>
          <button>
            {result.description}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
