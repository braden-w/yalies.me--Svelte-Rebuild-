import { writable, type Writable } from 'svelte/store';
import type { SessionStore } from '$lib/types/SessionStore';

export const sessionStore: Writable<SessionStore | null> = writable(null);
