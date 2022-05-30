<script lang="ts">
  import '../app.css';

  // Initialize theme-change, taken from https://github.com/saadeghi/theme-change
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';
  import { supabase } from '$lib/utils/supabaseClient';
  import { refreshSessionStore, sessionStore } from '$lib/stores/sessionStore';
  import { signOut } from '$lib/utils/auth';
  import type { ApiError, User } from '@supabase/supabase-js';
  import type { SessionStore } from '$lib/types/SessionStore';
  import type { UserMetadata } from '$lib/types/UserMetaData';
  import { goto } from '$app/navigation';
  import { browser } from '$app/env';

  import TheNavBar from '$lib/components/TheNavBar.svelte';
  onMount(() => {
    themeChange(false);
  });

  function checkEmail(user: User): boolean {
    // If the user email doesn't end with .edu, throw an error and redirect to sign in page
    if (!user?.email) return false;
    const email = user.email.toLowerCase();
    if (email.endsWith('.edu')) return true;
    else {
      signOut();
      alert('Please sign in with a .edu email address');
      return false;
    }
  }
  if (browser) {
    // Get login state on page load
    const user = supabase.auth.user();
    if (!user) goto('/landing');
    else {
      if (checkEmail(user)) {
        $sessionStore = processAuthState(user);
      }
    }
  }

  supabase.auth.onAuthStateChange(async (_, session) => {
    // If logout
    if (!session) {
      $sessionStore = null;
      goto('/landing');
    } else {
      // If login
      const user = supabase.auth.user();

      // Save profile data to session store
      const payload: SessionStore = processAuthState(user!);
      try {
        // Upload profile data from sessionStore to 'users' database
        const { data, error } = await supabase.from('users').upsert(payload);
        console.log(
          '🚀 ~ file: __layout.svelte ~ line 58 ~ const{data,error}=awaitsupabase.from ~ data',
          data
        );
        if (error) throw error;
      } catch (error) {
        if ((error as ApiError).message) {
          alert((error as ApiError).message);
        }
      } finally {
        refreshSessionStore();
        // goto('/profile');
      }
    }
  });

  /** Get everything before the @ of the email */
  function getUserFromEmail(email: string): string {
    const [emailUser] = email.split('@');
    return emailUser;
  }

  function processAuthState(user: User): SessionStore {
    // Get the variables "id" from $sessionStore
    const id = user?.id;

    // Get the user_response_id from userMetaData
    const userMetaData = user?.user_metadata as UserMetadata;
    const { email } = userMetaData;
    const user_response_id = getUserFromEmail(email);

    // Create payload for auth information
    const payload = { id, user_response_id, ...userMetaData };

    return payload;
  }
</script>

<TheNavBar>
  <slot />
</TheNavBar>

<!-- <footer>
	<p>Made with love and <span>❤️</span> by Braden</p>
</footer> -->
<style>
</style>
