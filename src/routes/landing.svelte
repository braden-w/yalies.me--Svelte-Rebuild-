<script lang="ts">
  import { signIn, authLoadingStore } from '$lib/stores/authStore';
</script>

<svelte:head>
  <title>Landing</title>
  <meta name="description" content="Log into the map!" />
</svelte:head>

<div class="min-h-screen-nav hero">
  <!-- Insert video with url https://i.imgur.com/0uL1zb2.mp4 -->
  <video
    class="top-0 left-0 h-full w-full "
    src="https://i.imgur.com/0uL1zb2.mp4"
    autoplay
    loop
    muted
  />
  <div class="hero-overlay bg-opacity-60" />
  <div class="hero-content text-center text-neutral-content">
    <div class="align-center max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Map of Yalies</h1>
      <p class="mb-5">
        An app that solves a single question: who is in my area?
      </p>
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
    </div>
  </div>
</div>
