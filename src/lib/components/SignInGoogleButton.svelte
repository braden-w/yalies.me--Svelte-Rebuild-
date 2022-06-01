<script lang="ts">
  import GoogleIcon from './icons/GoogleIcon.svelte';

  import { signIn } from '$lib/stores/auth/authLoadingStore';
  export let loading = false;
</script>

<button class:loading class="btn btn-primary" on:click={signIn}>
  <div class="left">
    <GoogleIcon />
  </div>
  Login with yale.edu
</button>
