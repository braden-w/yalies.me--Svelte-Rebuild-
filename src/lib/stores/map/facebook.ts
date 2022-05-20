import type {definitions} from '$lib/supabase';
import {supabase} from '$lib/utils/supabaseClient';
import { writable, type Writable } from 'svelte/store';

export const facebook: Writable<definitions['facebook_to_places'][] | null> = writable(null);

export async function load() {
    const { data } = await supabase
      .from<definitions['facebook_to_places']>('facebook_to_places')
      .select('*')
      .not('year', 'is', null);
facebook.set(data);
}
