<script lang="ts">
  import GoogleIcon from './icons/GoogleIcon.svelte';

  import { signIn, authLoadingStore } from '$lib/stores/auth/authLoadingStore';
</script>

<button
  class:loading={$authLoadingStore}
  class="btn btn-primary"
  on:click={signIn}
>
  <div class="left">
    <GoogleIcon />
  </div>
  Login with yale.edu
</button>
