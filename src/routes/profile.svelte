<script lang="ts">
  import { sessionStore } from '$lib/stores/sessionStore';
  import LocationAutoComplete from '$lib/components/LocationAutoComplete.svelte';
</script>

<svelte:head>
  <title>Profile</title>
  <meta name="description" content="My Profile Information" />
</svelte:head>

<!-- Put a centered card on the screen. Inside it, there are multiple labelled inputs that are binded to the corresponding properties of the user -->
<!-- <div class="w-full max-w-md mx-auto">
	<div
		class="card card-bordered bg-secondary text-secondary-content shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
	>
		
		<div class="mb-4">
		</div>
		<div class="mb-4">
			<label class="block text-sm font-bold mb-2" for="website"> Website </label>
			<input
				class="input shadow border rounded w-full focus:outline-none focus:shadow-outline"
				id="website"
				type="text"
				placeholder="Website"
			/>
		</div>
		<div class="card-actions justify-end">
			<button class="btn text-white">Change</button>
		</div>
	</div>
</div> -->
<!-- <div class="hero min-h-screen-nav from-primary via-secondary to-base-200 bg-gradient-to-b text-primary-content grid" > -->
<div class="hero min-h-screen-nav bg-base-200 text-base-content grid">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Where are you now?</h1>
      <p class="py-6">
        Enter your current city. For privacy, feel free to use a city that is in
        proximity rather than exact location.
      </p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body text-base-content">
        <div class="text-center">
          <div class="avatar mx-auto">
            <div class="w-28 rounded">
              <img
                src={$sessionStore?.avatar_url}
                alt="Profile"
                width="100%"
                height="100%"
                referrerpolicy="no-referrer"
              />
            </div>
          </div>
          <h1 class="text-2xl font-bold">{$sessionStore?.name}</h1>
          <p class="text-lg">Yale University</p>
        </div>
        <LocationAutoComplete />

        <div class="form-control mt-6">
          <a href="/" class="btn btn-primary">Go Back To Map</a>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- <div class="hero bg-base-100 text-base-content mx-auto min-h-screen max-w-md md:max-w-full">
	<div class="hero-content px-4 text-center md:px-0">
		<div>
			<h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">Clean HTML</h2>
			<h3 class="mb-5 text-3xl font-bold">with component classes</h3>
			<p class="mx-auto mb-5 w-full max-w-lg">
				Don't reinvent the wheel! <br />daisyUI adds classes to Tailwind CSS for all common UI
				components. Classes like <span class="badge badge-outline">btn</span>,
				<span class="badge badge-outline">card</span>, etc. This allows us to focus on important
				things instead of making basic elements for every project.
			</p>
			<p class="mx-auto mt-20 w-full max-w-lg" />
			<div class="font-bold">Creating a button</div>
			using only utility classes vs using daisyUI component classes
			<p />
			<div class="mt-10 mb-20 flex flex-col lg:flex-row">
				<div class="flex w-full flex-col text-left">
					<div class="mockup-code mx-auto w-full max-w-xs flex-grow shadow-lg sm:max-w-md">
						<pre><code
								>&lt;a class="<span class="text-amber-400"
									>inline-block px-4 py-3
    text-sm font-semibold text-center
    text-white uppercase transition
    duration-200 ease-in-out bg-indigo-600 
    rounded-md cursor-pointer
    hover:bg-indigo-700</span
								>"&gt;Button&lt;/a&gt;</code
							></pre>
					</div>
					<div class="mt-4 flex h-16 items-start justify-center">
						<button
							class="inline-block cursor-pointer rounded-md bg-indigo-600 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-indigo-700"
							>Button</button
						>
					</div>
				</div>
				<div class="divider text-base-content/50 lg:divider-horizontal uppercase">vs</div>
				<div class="flex w-full flex-col text-left">
					<div class="mockup-code mx-auto w-full max-w-xs flex-grow shadow-lg sm:max-w-md">
						<pre><code
								>&lt;a class="<span class="text-teal-500">btn btn-primary</span
								>"&gt;Button&lt;/a&gt;</code
							></pre>
					</div>
					<div class="mt-4 flex h-16 items-start justify-center">
						<button class="btn btn-primary">Button</button>
					</div>
				</div>
			</div>
			<p class="mx-auto mt-20 w-full max-w-lg" />
			<div class="font-bold">Creating a toggle</div>
			using only utility classes vs using daisyUI component classes
			<p />
			<div class="mt-10 mb-20 flex flex-col lg:flex-row">
				<div class="flex w-full flex-col text-left">
					<div class="mockup-code mx-auto w-full max-w-xs flex-grow shadow-lg sm:max-w-md">
						<pre><code
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
							></pre>
					</div>
					<div class="mt-4 flex h-16 items-start justify-center">
						<div class="relative">
							<input
								aria-label="Toggle"
								type="checkbox"
								checked="checked"
								class="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-gray-900"
							/>
							<span
								class="pointer-events-none absolute top-1 left-1 block h-4 w-4 rounded-full bg-gray-300 transition-all duration-200 peer-checked:left-7 peer-checked:bg-gray-900"
							/>
						</div>
					</div>
				</div>
				<div class="divider text-base-content/50 lg:divider-horizontal uppercase">vs</div>
				<div class="flex w-full flex-col text-left">
					<div
						class="mockup-code relative mx-auto w-full max-w-xs flex-grow shadow-lg sm:max-w-md lg:overflow-hidden"
					>
						<pre><code
								>&lt;input type="checkbox" class="<span class="text-teal-500">toggle</span
								>"/&gt;</code
							></pre>
						<img
							loading="lazy"
							class="pointer-events-none absolute bottom-0 right-[-6.1em] hidden -rotate-90 transition duration-1000 lg:block translate-x-60"
							src="/thats-quiet-big.png"
							alt="That's quiet big"
							width="666"
							height="375"
						/>
					</div>
					<div class="mt-4 flex h-16 items-start justify-center">
						<div>
							<input aria-label="Toggle" type="checkbox" checked="checked" class="toggle" />
						</div>
					</div>
				</div>
			</div>
			<p class="mx-auto w-full max-w-lg" />
			<div class="font-bold">Creating a menu component</div>
			using only utility classes vs using daisyUI component classes
			<p />
			<div class="mt-10 mb-20 flex flex-col lg:flex-row">
				<div class="flex w-full flex-col text-left">
					<div class="mockup-code mx-auto w-full max-w-xs flex-grow shadow-lg sm:max-w-md">
						<pre><code
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
							></pre>
					</div>
					<div class="mt-4 flex items-start justify-center overflow-hidden">
						<ul class="rounded-xl bg-gray-100 p-3">
							<li>
								<span class="block px-5 py-1 text-xs font-bold text-gray-400">Menu Title</span>
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
				<div class="divider text-base-content/50 lg:divider-horizontal uppercase">vs</div>
				<div class="flex w-full flex-col text-left">
					<div class="mockup-code mx-auto w-full max-w-xs flex-grow shadow-lg sm:max-w-md">
						<pre class="pr-4"><code
								>&lt;ul class="<span class="text-teal-500">menu</span
								> p-3 bg-base-200 rounded-xl"&gt;
    &lt;li class="<span class="text-teal-500">menu-title</span>"&gt;
      &lt;span&gt;Menu Title&lt;/span&gt;
    &lt;/li&gt;
    &lt;li&gt;&lt;a&gt;First Menu Item&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Second Menu Item&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Third Menu Item&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;</code
							></pre>
					</div>
					<div class="mt-4 flex items-start justify-center">
						<ul class="menu bg-base-200 rounded-xl p-3">
							<li class="menu-title"><span>Menu Title</span></li>
							<li><a href="/">First Menu Item</a></li>
							<li><a href="/">Second Menu Item</a></li>
							<li><a href="/">Third Menu Item</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div sveltekit:prefetch="" class="mt-6 mb-10 flex w-full justify-center">
				<a href="/components" class="btn btn-primary btn-wide">See All Components</a>
			</div>
		</div>
	</div>
</div> -->
