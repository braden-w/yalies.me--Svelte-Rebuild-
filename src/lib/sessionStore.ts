import type { Session, User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

export const user: Writable<boolean | Session | User | null> = writable(false);

