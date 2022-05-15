import type { User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

export interface UserMetadata {
	avatar_url: string;
	email: string;
	email_verified: boolean;
	full_name: string;
	iss: string;
	name: string;
	picture: string;
	provider_id: string;
	sub: string;
}

export const sessionStore: Writable<User | null> = writable(null);
