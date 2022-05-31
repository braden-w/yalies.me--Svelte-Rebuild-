import type { definitions } from '$lib/types/supabase';

export interface Person {
  id: string;
  name: string;
  avatar_url: string;
}

export interface PersonFromFacebook {
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  image: string;
  year: number;
}

export interface definitionsJSON
  extends Omit<definitions, 'places_with_people'> {
  places_with_people: {
    /**
     * Format: character varying
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    place_id?: string;
    /** Format: character varying */
    description?: string;
    /** Format: double precision */
    lat?: number;
    /** Format: double precision */
    lng?: number;
    /** Format: json */
    people?: (Person | PersonFromFacebook)[];
  };
}
