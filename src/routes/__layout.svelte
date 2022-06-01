<script context="module" lang="ts">
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

  /** Upload profile data from profileStore to 'users' database */
  async function uploadProfileDataToSupabase(
    payload: definitionsJSON['users'] | null
  ) {
    if (!payload) return;
    try {
      const { data, error } = await supabase
        .from<definitionsJSON['users']>('users')
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
    }
  }

  /** Get everything before the @ of the email */
  function getUserFromEmail(email: string): string {
    const [emailUser] = email.split('@');
    return emailUser;
  }

  function processAuthState(
    user: User | null
  ): definitionsJSON['users'] | null {
    if (!user) return null;
    // Get the variables "id" from $profileStore
    const id = user.id;

    // Get the user_response_id from userMetaData
    const userMetaData = user.user_metadata as UserMetadata;
    const { email } = userMetaData;
    const user_response_id = getUserFromEmail(email);

    // Create payload for auth information
    const payload = { id, user_response_id, ...userMetaData };
    return payload;
  }
</script>

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
  import type { UserMetadata } from '$lib/types/UserMetaData';
  import { browser } from '$app/env';

  import TheNavBar from '$lib/components/TheNavBar.svelte';
  import LoginSplashScreen from '$lib/components/LoginSplashScreen.svelte';
  import type { definitionsJSON } from '$lib/types/definitionsJSON';

  // Handle login state on page load
  if (browser) {
    redirectIfUserNullOrNotEdu(supabase.auth.user());
    $authLoadingStore = false;
  }

  // Handle login state once supabase changes kick in
  supabase.auth.onAuthStateChange((_, loggedIn) => {
    // If logout
    if (!loggedIn) {
      $profileStore = null;
      $authLoadingStore = false;
      console.log(
        '🚀 ~ file: __layout.svelte ~ line 49 ~ supabase.auth.onAuthStateChange ~ authLoadingStore',
        authLoadingStore
      );
      // return goto('/landing');
    }
    // If login
    const user = supabase.auth.user();
    console.log(
      '🚀 ~ file: __layout.svelte ~ line 48 ~ supabase.auth.onAuthStateChange ~ user',
      user
    );
    if (user) $authLoadingStore = false;
    const payload: definitionsJSON['users'] | null = processAuthState(user);
    console.log(
      '🚀 ~ file: __layout.svelte ~ line 60 ~ supabase.auth.onAuthStateChange ~ payload',
      payload
    );
    uploadProfileDataToSupabase(payload);
    refreshProfileStore(payload?.id);
  });

  onMount(() => {
    themeChange(false);
  });
</script>

<TheNavBar>
  {#if $authLoadingStore}
    <LoginSplashScreen loading={true} />
    <!-- Else if Logged In, just loading store -->
    <!-- Else if Logged Out -->
  {:else if !$profileStore}
    <LoginSplashScreen loading={false} />
  {:else}
    <slot />
  {/if}
  <footer>
    <div class="flex flex-col justify-center">
      <p class="text-center">
        Made with <span>❤️</span> by Braden.
      </p>
      <a class="btn btn-xs" href="mailto:braden.wong@yale.edu">
        Request a feature or report a bug
      </a>
    </div>
  </footer>
</TheNavBar>

<style>
</style>
