<script lang="ts">
  import ListOfLocations from '$lib/components/ListOfLocations.svelte';

  import LoginSplashScreen from '../lib/components/LoginSplashScreen.svelte';
  export const prerender = true;
</script>

<svelte:head>
  <title>Landing</title>
  <meta name="description" content="Log into the map!" />
</svelte:head>

<LoginSplashScreen />

<div
  class="hero mx-auto min-h-screen max-w-md bg-base-100 text-base-content md:max-w-full"
>
  <div class="hero-content px-4 text-center md:px-0">
    <div>
      <h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">Yalies.Me</h2>
      <h3 class="mb-5 text-3xl font-bold">
        An app that solves a single question: who is in my area?
      </h3>
      <p class="mx-auto mb-5 w-full max-w-lg">A map,</p>
      <div class="mt-10 mb-20 flex flex-col lg:flex-row">
        <div class="flex w-full flex-col text-left">
          <div
            class="mockup-code mx-auto w-full max-w-xs flex-grow shadow-lg sm:max-w-md"
          >
            <pre>
<code
                >&lt;ul class="py-3 bg-gray-100 rounded-xl"&gt;
    &lt;li&gt;
      &lt;span class="<span class="text-amber-400"
                  >block px-5 py-1 text-xs text-gray-400 font-bold</span
                >"&gt;Menu Title&lt;/span&gt;
    &lt;/li&gt;
    &lt;li&gt;&lt;a class="<span class="text-amber-400"
                  >block px-5 py-3 rounded-lg text-gray-900 hover:bg-gray-200 active:bg-indigo-600 active:text-white outline-none cursor-pointer</span
                >"&gt;First Menu Item&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a class="<span class="text-amber-400"
                  >block px-5 py-3 rounded-lg text-gray-900 hover:bg-gray-200 active:bg-indigo-600 active:text-white outline-none cursor-pointer</span
                >"&gt;Second Menu Item&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a class="<span class="text-amber-400"
                  >block px-5 py-3 rounded-lg text-gray-900 hover:bg-gray-200 active:bg-indigo-600 active:text-white outline-none cursor-pointer</span
                >"&gt;Third Menu Item&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;</code
              >
</pre>
          </div>
          <div class="mt-4 flex items-start justify-center overflow-hidden">
            <ul class="rounded-xl bg-gray-100 p-3">
              <li>
                <span class="block px-5 py-1 text-xs font-bold text-gray-400"
                  >Menu Title</span
                >
              </li>
              <li>
                <a
                  href="/"
                  class="block cursor-pointer rounded-lg px-5 py-3 text-gray-900 outline-none hover:bg-gray-200 active:bg-indigo-600 active:text-white"
                  >First Menu Item</a
                >
              </li>
              <li>
                <a
                  href="/"
                  class="block cursor-pointer rounded-lg px-5 py-3 text-gray-900 outline-none hover:bg-gray-200 active:bg-indigo-600 active:text-white"
                  >Second Menu Item</a
                >
              </li>
              <li>
                <a
                  href="/"
                  class="block cursor-pointer rounded-lg px-5 py-3 text-gray-900 outline-none hover:bg-gray-200 active:bg-indigo-600 active:text-white"
                  >Third Menu Item</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div
          class="divider uppercase text-base-content/50 lg:divider-horizontal"
        >
          vs
        </div>
        <div class="flex w-full flex-col text-left">
          <div
            class="mockup-code mx-auto w-full max-w-xs flex-grow shadow-lg sm:max-w-md"
          >
            <pre class="pr-4">
<code
                >&lt;ul class="<span class="text-teal-500">menu</span
                > p-3 bg-base-200 rounded-xl"&gt;
    &lt;li class="<span class="text-teal-500">menu-title</span>"&gt;
      &lt;span&gt;Menu Title&lt;/span&gt;
    &lt;/li&gt;
    &lt;li&gt;&lt;a&gt;First Menu Item&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Second Menu Item&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Third Menu Item&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;</code
              >
</pre>
          </div>
          <div class="mt-4 flex items-start justify-center">
            <ul class="menu rounded-xl bg-base-200 p-3">
              <li class="menu-title">
                <span>Menu Title</span>
              </li>
              <li>
                <a href="/">First Menu Item</a>
              </li>
              <li>
                <a href="/">Second Menu Item</a>
              </li>
              <li>
                <a href="/">Third Menu Item</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-6 mb-10 flex w-full justify-center">
        <a href="/components" class="btn btn-primary btn-wide">
          See All Components
        </a>
      </div>
    </div>
  </div>
</div>
