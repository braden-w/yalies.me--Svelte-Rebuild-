<script lang="ts">
  import SignInGoogleButton from '$lib/components/SignInGoogleButton.svelte';

  export const prerender = true;
  const photoNames = [
    'LocationsList.png',
    'LocationsTable.png',
    'Map.png',
    'Profile.png',
    'Profile Other.png',
    'New Haven.png',
    'New Haven In.png'
  ];

  const photoURLs = photoNames.map((name) => `../../photos/${name}`);
</script>

<svelte:head>
  <title>Landing</title>
  <meta name="description" content="Log into the map!" />
</svelte:head>

<div
  class="hero mx-auto min-h-screen max-w-md bg-base-100 text-base-content md:max-w-full"
>
  <div class="hero-overlay bg-opacity-60" />
  <div class="hero-content px-4 text-center md:px-0">
    <div>
      <h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">Yalies.Me</h2>
      <h3 class="mb-5 text-3xl font-bold">
        An app that solves a single question: who is in my area?
      </h3>
      <p class="mx-auto mb-5 w-full max-w-lg">A map,</p>
      <section class="overflow-hidden text-gray-700">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
          <div class="-m-1 flex flex-wrap md:-m-2">
            <div class="flex w-1/2 flex-wrap">
              <div class="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  class="block h-full w-full rounded-lg object-cover object-center"
                  src={photoURLs[0]}
                />
              </div>
              <div class="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  class="block h-full w-full rounded-lg object-cover object-center"
                  src={photoURLs[1]}
                />
              </div>
              <div class="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  class="block h-full w-full rounded-lg object-cover object-center"
                  src={photoURLs[2]}
                />
              </div>
            </div>
            <div class="flex w-1/2 flex-wrap">
              <div class="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  class="block h-full w-full rounded-lg object-cover object-center"
                  src={photoURLs[3]}
                />
              </div>
              <div class="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  class="block h-full w-full rounded-lg object-cover object-center"
                  src={photoURLs[4]}
                />
              </div>
              <div class="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  class="block h-full w-full rounded-lg object-cover object-center"
                  src={photoURLs[5]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-10 mb-20 flex flex-col lg:flex-row">
        <div class="flex w-full flex-col text-left">
          <div
            class="mockup-code mx-auto w-full max-w-xs flex-grow shadow-lg sm:max-w-md"
          >
            <pre>
<code>
                <video
                  class="top-0 left-0 h-full w-full"
                  src="https://i.imgur.com/0uL1zb2.mp4"
                  autoplay
                  loop
                  muted
                />
  </code>
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
        <SignInGoogleButton />
      </div>
    </div>
  </div>
</div>
