<script lang="ts">
  import '../app.css';

  // Initialize theme-change, taken from https://github.com/saadeghi/theme-change
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';
  import { supabase } from '$lib/utils/supabaseClient';
  import {
    refreshProfileStore,
    profileStore
  } from '$lib/stores/auth/profileStore';
  import { authLoadingStore, signOut } from '$lib/stores/auth/authLoadingStore';
  import type { ApiError, User } from '@supabase/supabase-js';
  import type { ProfileStore } from '$lib/types/ProfileStore';
  import type { UserMetadata } from '$lib/types/UserMetaData';
  import { goto } from '$app/navigation';
  import { browser } from '$app/env';

  import TheNavBar from '$lib/components/TheNavBar.svelte';
  import type { definitions } from '$lib/types/supabase';
  onMount(() => {
    themeChange(false);
  });

  // If the user email doesn't end with .edu, throw an error and redirect to sign in page
  function emailIsEdu(user: User): boolean {
    if (!user?.email) return false;
    const email = user.email.toLowerCase();
    return email.endsWith('.edu');
  }

  function redirectIfUserNullOrNotEdu(user: User | null) {
    // Get login state on page load
    if (!user) return;
    if (!emailIsEdu(user)) {
      signOut();
      alert('Please sign in with a .edu email address');
    }
  }

  // Handle login state on page load
  if (browser) {
    redirectIfUserNullOrNotEdu(supabase.auth.user());
    $authLoadingStore = false;
  }

  // Handle login state once supabase changes kick in
  supabase.auth.onAuthStateChange(async (_, loggedIn) => {
    // If logout
    if (!loggedIn) {
      $profileStore = null;
      $authLoadingStore = false;
      return goto('/landing');
    }
    // If login
    const user = supabase.auth.user();
    console.log(
      '🚀 ~ file: __layout.svelte ~ line 48 ~ supabase.auth.onAuthStateChange ~ user',
      user
    );

    // Save profile data to session store
    const payload: ProfileStore = processAuthState(user);
    try {
      // Upload profile data from profileStore to 'users' database
      const { data, error } = await supabase
        .from<definitions['users']>('users')
        .upsert(payload);
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
      refreshProfileStore(payload.id);
      $authLoadingStore = false;
      // goto('/profile');
    }
  });

  /** Get everything before the @ of the email */
  function getUserFromEmail(email: string): string {
    const [emailUser] = email.split('@');
    return emailUser;
  }

  function processAuthState(user: User | null): ProfileStore {
    // Get the variables "id" from $profileStore
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
  {$authLoadingStore}
  {#if $authLoadingStore}
    Hello
  {:else}
    <slot />
  {/if}
</TheNavBar>

<!-- <footer>
	<p>Made with love and <span>❤️</span> by Braden</p>
</footer> -->
<style>
</style>
