import {supabase} from "$lib/utils/supabaseClient";

export const defaultResults = [
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

export interface Payload {
  place_id: string;
  description: string;
  geog: string;
}


export async function uploadPlaceToSupabase(payload: Payload) {
  const {error: errorPlaces} = await supabase
    .from('places')
    .upsert(payload, {
      returning: 'minimal' // Don't return the value after inserting
    });
  if (errorPlaces) throw errorPlaces;
}
export async function uploadUserPlaceSelectionToSupabase(user_response_id: string | undefined, place_id: string) {
  if (!user_response_id) return;
  const {error: errorUserIDtoPlaceID} = await supabase
    .from('user_responses')
    .upsert({place_id, user_response_id}, {returning: 'minimal'});
  if (errorUserIDtoPlaceID) throw errorUserIDtoPlaceID;
}