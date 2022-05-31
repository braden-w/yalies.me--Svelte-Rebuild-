<script lang="ts">
  import SignInGoogleButton from './SignInGoogleButton.svelte';
</script>

<div class="min-h-screen-nav hero">
  <!-- Insert video with url https://i.imgur.com/0uL1zb2.mp4 -->
  <video
    class="top-0 left-0 h-full w-full"
    src="https://i.imgur.com/0uL1zb2.mp4"
    autoplay
    loop
    muted
  />
  <div class="hero-overlay bg-opacity-60" />
  <div class="hero-content text-center text-neutral-content">
    <div class="align-center max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Yalies.Me</h1>
      <p class="mb-5">
        An app that solves a single question: who is in my area?
      </p>
      <SignInGoogleButton />
    </div>
  </div>
</div>
