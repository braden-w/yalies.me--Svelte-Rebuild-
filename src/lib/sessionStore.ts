import type { Session } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

export const user: Writable<boolean | Session | null> = writable(false);
