<script lang="ts">
  import LoginSplashScreen from '../lib/components/LoginSplashScreen.svelte';
  export const prerender = true;
</script>

<svelte:head>
  <title>Landing</title>
  <meta name="description" content="Log into the map!" />
</svelte:head>

<LoginSplashScreen loading={false} />
