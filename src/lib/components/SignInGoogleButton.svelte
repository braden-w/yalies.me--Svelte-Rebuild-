<script lang="ts">
  import { signIn, authLoadingStore } from '$lib/stores/auth/authLoadingStore';
</script>

<button class:loading={$authLoadingStore} class="btn" on:click={signIn}>
  <div class="left">
    <img
      width="20px"
      style="margin-top:7px; margin-right:8px"
      alt="Google sign-in"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
      referrerpolicy="no-referrer"
    />
  </div>
  Login with Google
</button>
