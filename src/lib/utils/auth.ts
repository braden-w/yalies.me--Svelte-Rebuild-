import { goto } from '$app/navigation';
import { supabase } from '$lib/utils/supabaseClient';
import type { ApiError } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

export const authLoadingStore: Writable<boolean> = writable(false);
export const signIn = async () => {
  try {
    authLoadingStore.set(true);
    const redirectURL = window.location.origin;
    const { error } = await supabase.auth.signIn(
      { provider: 'google' },
      { redirectTo: redirectURL }
    );
    if (error) throw error;
  } catch (error) {
    if ((error as ApiError).message) {
      alert((error as ApiError).message);
    }
  } finally {
    authLoadingStore.set(false);
  }
};

export async function signOut() {
  try {
    authLoadingStore.set(true);
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    if ((error as ApiError).message) {
      alert((error as ApiError).message);
    }
  } finally {
    authLoadingStore.set(false);
  }
}
