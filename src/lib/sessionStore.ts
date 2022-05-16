import {writable, type Writable} from 'svelte/store';
import type {SessionStore} from 'types/SessionStore';

export const sessionStore: Writable<SessionStore | null> = writable(null);