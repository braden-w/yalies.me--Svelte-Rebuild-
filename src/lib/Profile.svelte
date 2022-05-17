<script lang="ts">
	import { supabase } from '$lib/utils/supabaseClient';
	import { sessionStore } from '$lib/utils/sessionStore';
	import LocationAutoComplete from '$lib/LocationAutoComplete.svelte';

	const user = supabase.auth.user();
</script>

<!-- Put a centered card on the screen. Inside it, there are multiple labelled inputs that are binded to the corresponding properties of the user -->
<div class="w-full max-w-md mx-auto">
	<div
		class="card card-bordered bg-secondary text-secondary-content shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
	>
		<div class="mb-4 text-center">
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
		<div class="mb-4">
			<LocationAutoComplete />
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
			<button class="btn  text-white">Change</button>
		</div>
	</div>
</div>

<ul
	role="listbox"
	aria-labelledby="typeahead-0.y481t91gkcn-label"
	id="typeahead-0.y481t91gkcn-listbox"
	class="svelte-6c74g2 svelte-typeahead-list"
>
	<li
		role="option"
		id="typeahead-0.y481t91gkcn-result-0"
		aria-selected="true"
		class="svelte-6c74g2 selected"
	>
		<div class="py-1 text-sm">Carousel</div>
	</li>
	<li
		role="option"
		id="typeahead-0.y481t91gkcn-result-1"
		aria-selected="false"
		class="svelte-6c74g2"
	>
		<div class="py-1 text-sm">Collapse</div>
	</li>
	<li
		role="option"
		id="typeahead-0.y481t91gkcn-result-2"
		aria-selected="false"
		class="svelte-6c74g2"
	>
		<div class="py-1 text-sm">Progress</div>
	</li>
	<li
		role="option"
		id="typeahead-0.y481t91gkcn-result-3"
		aria-selected="false"
		class="svelte-6c74g2"
	>
		<div class="py-1 text-sm">Radial progress</div>
	</li>
	<li
		role="option"
		id="typeahead-0.y481t91gkcn-result-4"
		aria-selected="false"
		class="svelte-6c74g2"
	>
		<div class="py-1 text-sm">Stat</div>
	</li>
	<li
		role="option"
		id="typeahead-0.y481t91gkcn-result-5"
		aria-selected="false"
		class="svelte-6c74g2"
	>
		<div class="py-1 text-sm">Range</div>
	</li>
	<li
		role="option"
		id="typeahead-0.y481t91gkcn-result-6"
		aria-selected="false"
		class="svelte-6c74g2"
	>
		<div class="py-1 text-sm">Drawer</div>
	</li>
</ul>
