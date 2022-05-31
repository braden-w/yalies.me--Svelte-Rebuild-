<script context="module" lang="ts">
  import type { definitionsJSON } from '$lib/types/definitionsJSON';
  import { supabase } from '$lib/utils/supabaseClient';

  export async function load() {
    const { data: places, error } = await supabase
      .from<definitionsJSON['places_with_people']>('places_with_people')
      .select('*')
      .not('people', 'is', null);
    if (error) console.error(error);
    return {
      status: 200,
      props: {
        places
      }
    };
  }
</script>

<script lang="ts">
  import { profileStore } from '$lib/stores/auth/profileStore';
  import LocationAutoComplete from '$lib/components/LocationAutoComplete.svelte';
  import TableOfLocations from '$lib/components/TableOfLocations.svelte';

  export let places: definitionsJSON['places_with_people'][] = [];
</script>

<svelte:head>
  <title>Edit Location</title>
  <meta name="description" content="Edit my current location." />
</svelte:head>

<!-- Put a centered card on the screen. Inside it, there are multiple labelled inputs that are binded to the corresponding properties of the user -->
<!-- <div class="w-full max-w-md mx-auto">
	<div
		class="px-8 pt-6 pb-8 mb-4 rounded-lg shadow-md card card-bordered bg-secondary text-secondary-content"
	>
		
		<div class="mb-4">
		</div>
		<div class="mb-4">
			<label class="block mb-2 text-sm font-bold" for="website"> Website </label>
			<input
				class="w-full border rounded shadow input focus:outline-none focus:shadow-outline"
				id="website"
				type="text"
				placeholder="Website"
			/>
		</div>
		<div class="justify-end card-actions">
			<button class="text-white btn">Change</button>
		</div>
	</div>
</div> -->
<!-- <div class="hero min-h-screen-nav from-primary via-secondary to-base-200 bg-gradient-to-b text-primary-content grid" > -->
<div class="min-h-screen-nav hero grid bg-base-200 text-base-content">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Where are you now?</h1>
      <p class="py-6">
        Enter your current city. For privacy, feel free to use a city that is in
        proximity rather than exact location.
      </p>
    </div>
    <div class="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      <div class="card-body text-base-content">
        <div class="text-center">
          <div class="avatar mx-auto">
            <div class="w-28 rounded">
              <img
                src={$profileStore?.avatar_url}
                alt="Profile"
                width="100%"
                height="100%"
                referrerpolicy="no-referrer"
              />
            </div>
          </div>
          <h1 class="text-2xl font-bold">{$profileStore?.name}</h1>
          <p class="text-lg">Yale University</p>
        </div>
        <LocationAutoComplete
          query={$profileStore?.description}
          isCurrentUser={true}
        />

        <div class="form-control mt-6">
          <a href="/map" class="btn btn-primary" sveltekit:prefetch>Go To Map</a
          >
        </div>
      </div>
    </div>
  </div>
</div>

<div class="hero min-h-screen bg-base-100">
  <div class="hero-content w-full flex-row flex-wrap">
    <div class="w-full overflow-x-auto">
      <div class="w-full">
        <h1 class="text-5xl font-bold">Locations</h1>
        <p class="py-6">There are currently a lot of locations!</p>
      </div>
      <TableOfLocations {places} />
    </div>
  </div>
</div>
<!-- <div class="max-w-md min-h-screen mx-auto hero bg-base-100 text-base-content md:max-w-full">
	<div class="px-4 text-center hero-content md:px-0">
		<div>
			<h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">Clean HTML</h2>
			<h3 class="mb-5 text-3xl font-bold">with component classes</h3>
			<p class="w-full max-w-lg mx-auto mb-5">
				Don't reinvent the wheel! <br />daisyUI adds classes to Tailwind CSS for all common UI
				components. Classes like <span class="badge badge-outline">btn</span>,
				<span class="badge badge-outline">card</span>, etc. This allows us to focus on important
				things instead of making basic elements for every project.
			</p>
			<p class="w-full max-w-lg mx-auto mt-20" />
			<div class="font-bold">Creating a button</div>
			using only utility classes vs using daisyUI component classes
			<p />
			<div class="flex flex-col mt-10 mb-20 lg:flex-row">
				<div class="flex flex-col w-full text-left">
					<div class="flex-grow w-full max-w-xs mx-auto shadow-lg mockup-code sm:max-w-md">
						<pre>
<code
								>&lt;a class="<span class="text-amber-400"
									>inline-block px-4 py-3
    text-sm font-semibold text-center
    text-white uppercase transition
    duration-200 ease-in-out bg-indigo-600 
    rounded-md cursor-pointer
    hover:bg-indigo-700</span
								>"&gt;Button&lt;/a&gt;</code
							>
</pre>
					</div>
					<div class="flex items-start justify-center h-16 mt-4">
						<button
							class="inline-block px-4 py-3 text-sm font-semibold text-center text-white uppercase bg-indigo-600 cursor-pointer rounded-md transition duration-200 ease-in-out hover:bg-indigo-700"
							>Button</button
						>
					</div>
				</div>
				<div class="uppercase divider text-base-content/50 lg:divider-horizontal">vs</div>
				<div class="flex flex-col w-full text-left">
					<div class="flex-grow w-full max-w-xs mx-auto shadow-lg mockup-code sm:max-w-md">
						<pre>
<code
								>&lt;a class="<span class="text-teal-500">btn btn-primary</span
								>"&gt;Button&lt;/a&gt;</code
							>
</pre>
					</div>
					<div class="flex items-start justify-center h-16 mt-4">
						<button class="btn btn-primary">Button</button>
					</div>
				</div>
			</div>
			<p class="w-full max-w-lg mx-auto mt-20" />
			<div class="font-bold">Creating a toggle</div>
			using only utility classes vs using daisyUI component classes
			<p />
			<div class="flex flex-col mt-10 mb-20 lg:flex-row">
				<div class="flex flex-col w-full text-left">
					<div class="flex-grow w-full max-w-xs mx-auto shadow-lg mockup-code sm:max-w-md">
						<pre>
<code
								>&lt;div class="<span class="text-amber-400">relative</span>"&gt;
    &lt;input type="checkbox" class="<span class="text-amber-400"
									>peer
    appearance-none cursor-pointer
    border border-gray-300 rounded-full
    checked:border-gray-900 w-12 h-6</span
								>"/&gt;
    &lt;span class="<span class="text-amber-400"
									>peer-checked:left-7
    peer-checked:bg-gray-900
    transition-all duration-200
    pointer-events-none w-4 h-4
    block absolute top-1 left-1
    rounded-full bg-gray-300</span
								>"&gt;&lt;/span&gt;
  &lt;/div&gt;</code
							>
</pre>
					</div>
					<div class="flex items-start justify-center h-16 mt-4">
						<div class="relative">
							<input
								aria-label="Toggle"
								type="checkbox"
								checked="checked"
								class="w-12 h-6 border border-gray-300 rounded-full appearance-none cursor-pointer peer checked:border-gray-900"
							/>
							<span
								class="absolute block w-4 h-4 bg-gray-300 rounded-full pointer-events-none top-1 left-1 transition-all duration-200 peer-checked:left-7 peer-checked:bg-gray-900"
							/>
						</div>
					</div>
				</div>
				<div class="uppercase divider text-base-content/50 lg:divider-horizontal">vs</div>
				<div class="flex flex-col w-full text-left">
					<div
						class="relative flex-grow w-full max-w-xs mx-auto shadow-lg mockup-code sm:max-w-md lg:overflow-hidden"
					>
						<pre>
<code
								>&lt;input type="checkbox" class="<span class="text-teal-500">toggle</span
								>"/&gt;</code
							>
</pre>
						<img
							loading="lazy"
							class="pointer-events-none absolute bottom-0 right-[-6.1em] hidden -rotate-90 transition duration-1000 lg:block translate-x-60"
							src="/thats-quiet-big.png"
							alt="That's quiet big"
							width="666"
							height="375"
						/>
					</div>
					<div class="flex items-start justify-center h-16 mt-4">
						<div>
							<input aria-label="Toggle" type="checkbox" checked="checked" class="toggle" />
						</div>
					</div>
				</div>
			</div>
			<p class="w-full max-w-lg mx-auto" />
			<div class="font-bold">Creating a menu component</div>
			using only utility classes vs using daisyUI component classes
			<p />
			<div class="flex flex-col mt-10 mb-20 lg:flex-row">
				<div class="flex flex-col w-full text-left">
					<div class="flex-grow w-full max-w-xs mx-auto shadow-lg mockup-code sm:max-w-md">
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
					<div class="flex items-start justify-center mt-4 overflow-hidden">
						<ul class="p-3 bg-gray-100 rounded-xl">
							<li>
								<span class="block px-5 py-1 text-xs font-bold text-gray-400">Menu Title</span>
							</li>
							<li>
								<a
									href="/"
									class="block px-5 py-3 text-gray-900 rounded-lg outline-none cursor-pointer hover:bg-gray-200 active:bg-indigo-600 active:text-white"
									>First Menu Item</a
								>
							</li>
							<li>
								<a
									href="/"
									class="block px-5 py-3 text-gray-900 rounded-lg outline-none cursor-pointer hover:bg-gray-200 active:bg-indigo-600 active:text-white"
									>Second Menu Item</a
								>
							</li>
							<li>
								<a
									href="/"
									class="block px-5 py-3 text-gray-900 rounded-lg outline-none cursor-pointer hover:bg-gray-200 active:bg-indigo-600 active:text-white"
									>Third Menu Item</a
								>
							</li>
						</ul>
					</div>
				</div>
				<div class="uppercase divider text-base-content/50 lg:divider-horizontal">vs</div>
				<div class="flex flex-col w-full text-left">
					<div class="flex-grow w-full max-w-xs mx-auto shadow-lg mockup-code sm:max-w-md">
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
					<div class="flex items-start justify-center mt-4">
						<ul class="p-3 menu bg-base-200 rounded-xl">
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
			<div sveltekit:prefetch="" class="flex justify-center w-full mt-6 mb-10">
				<a href="/components" class="btn btn-primary btn-wide">See All Components</a>
			</div>
		</div>
	</div>
</div> -->
