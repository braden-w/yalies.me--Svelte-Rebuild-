<script lang="ts">
	import '../app.css';

	// Initialize theme-change, taken from https://github.com/saadeghi/theme-change
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { supabase } from '$lib/utils/supabaseClient';
	import { sessionStore } from '$lib/utils/sessionStore';
	import { signOut } from '$lib/utils/auth';
	import type { User } from '@supabase/supabase-js';
	import type { SessionStore } from 'types/SessionStore';
	import type { UserMetadata } from 'types/UserMetaData';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	onMount(() => {
		themeChange(false);
	});

	if (browser) {
		// Get login state on page load
		const user = supabase.auth.user();
		if (!user) goto('/');
		else {
			goto('/map');
			$sessionStore = processAuthState(user);
		}
	}

	supabase.auth.onAuthStateChange(async (_, session) => {
		// If logout
		if (!session) {
			$sessionStore = null;
			goto('/');
		} else {
			// If login
			goto('/map');
			const user = supabase.auth.user();

			// Save profile data to session store
			$sessionStore = processAuthState(user!);
			try {
				// Upload profile data from sessionStore to 'user_data_new' database
				const { error } = await supabase.from('users').upsert($sessionStore!, {
					returning: 'minimal' // Don't return the value after inserting
				});
				if (error) throw error;
			} catch (error: any) {
				alert(error.message);
			}
		}
	});

	/** Get everything before the @ of the email */
	function getUserFromEmail(email: string): string {
		const [emailUser] = email.split('@');
		return emailUser;
	}

	function processAuthState(user: User): SessionStore {
		// Get the variables "id" from $sessionStore
		const id = user?.id;

		// Get the user_response_id from userMetaData
		const userMetaData = user?.user_metadata as UserMetadata;
		const { email } = userMetaData;
		const user_response_id = getUserFromEmail(email);

		// Create payload for auth information
		const payload = { id, user_response_id, ...userMetaData };

		return payload;
	}
</script>

<div class="bg-base-100 drawer">
	<input id="main-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		<header>
			<div class="navbar bg-base-100">
				<div class="flex-none">
					<label for="main-drawer" class="btn btn-square btn-ghost drawer-button">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block w-5 h-5 stroke-current"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</label>
				</div>
				<div class="flex-1">
					<a href="/" class="btn btn-ghost normal-case text-xl">Yalies Around Me</a>
				</div>
				<div class="flex-none">
					<div class="dropdown dropdown-end">
						<label for="main-drawer " tabindex="0" class="btn btn-ghost btn-circle">
							<div class="indicator">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/></svg
								>
								<span class="badge badge-sm indicator-item">8</span>
							</div>
						</label>
						<div
							tabindex="0"
							class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
						>
							<div class="card-body">
								<span class="font-bold text-lg">Notifications</span>
								<span class="text-info">You'll see notifications here</span>
								<div class="card-actions">
									<button class="btn btn-primary btn-block">Hello!</button>
								</div>
							</div>
						</div>
					</div>
					<div title="Change Theme" class="dropdown dropdown-end ">
						<div tabindex="0" class="btn gap-1 normal-case btn-ghost">
							<svg
								width="20"
								height="20"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
								/></svg
							> <span class="hidden md:inline">Theme</span>
							<svg
								width="12px"
								height="12px"
								class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 2048 2048"
								><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" /></svg
							>
						</div>

						<div
							class="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16"
						>
							<div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="light"
									data-act-class="outline"
								>
									<div
										data-theme="light"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">light</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="dark"
									data-act-class="outline"
								>
									<div
										data-theme="dark"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">dark</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="cupcake"
									data-act-class="outline"
								>
									<div
										data-theme="cupcake"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">cupcake</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="bumblebee"
									data-act-class="outline"
								>
									<div
										data-theme="bumblebee"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">bumblebee</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="emerald"
									data-act-class="outline"
								>
									<div
										data-theme="emerald"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">emerald</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="corporate"
									data-act-class="outline"
								>
									<div
										data-theme="corporate"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">corporate</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="synthwave"
									data-act-class="outline"
								>
									<div
										data-theme="synthwave"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">synthwave</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="retro"
									data-act-class="outline"
								>
									<div
										data-theme="retro"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">retro</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="cyberpunk"
									data-act-class="outline"
								>
									<div
										data-theme="cyberpunk"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">cyberpunk</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="valentine"
									data-act-class="outline"
								>
									<div
										data-theme="valentine"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">valentine</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="halloween"
									data-act-class="outline"
								>
									<div
										data-theme="halloween"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">halloween</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="garden"
									data-act-class="outline"
								>
									<div
										data-theme="garden"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">garden</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="forest"
									data-act-class="outline"
								>
									<div
										data-theme="forest"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">forest</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="aqua"
									data-act-class="outline"
								>
									<div
										data-theme="aqua"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">aqua</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="lofi"
									data-act-class="outline"
								>
									<div
										data-theme="lofi"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">lofi</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="pastel"
									data-act-class="outline"
								>
									<div
										data-theme="pastel"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">pastel</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="fantasy"
									data-act-class="outline"
								>
									<div
										data-theme="fantasy"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">fantasy</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="wireframe"
									data-act-class="outline"
								>
									<div
										data-theme="wireframe"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">wireframe</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="black"
									data-act-class="outline"
								>
									<div
										data-theme="black"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">black</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="luxury"
									data-act-class="outline"
								>
									<div
										data-theme="luxury"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">luxury</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="dracula"
									data-act-class="outline"
								>
									<div
										data-theme="dracula"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">dracula</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="cmyk"
									data-act-class="outline"
								>
									<div
										data-theme="cmyk"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">cmyk</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="autumn"
									data-act-class="outline"
								>
									<div
										data-theme="autumn"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">autumn</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="business"
									data-act-class="outline"
								>
									<div
										data-theme="business"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">business</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="acid"
									data-act-class="outline"
								>
									<div
										data-theme="acid"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">acid</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="lemonade"
									data-act-class="outline"
								>
									<div
										data-theme="lemonade"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">lemonade</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="night"
									data-act-class="outline"
								>
									<div
										data-theme="night"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">night</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
									data-set-theme="coffee"
									data-act-class="outline"
								>
									<div
										data-theme="coffee"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">coffee</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 outline"
									data-set-theme="winter"
									data-act-class="outline"
								>
									<div
										data-theme="winter"
										class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
									>
										<div class="grid grid-cols-5 grid-rows-3">
											<div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
												<div class="flex-grow text-sm font-bold">winter</div>
												<div class="flex flex-shrink-0 flex-wrap gap-1">
													<div class="bg-primary w-2 rounded" />
													<div class="bg-secondary w-2 rounded" />
													<div class="bg-accent w-2 rounded" />
													<div class="bg-neutral w-2 rounded" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="dropdown dropdown-end">
						<label tabindex="0" class="btn btn-ghost btn-circle avatar">
							<div class="w-10 rounded-full">
								<img src={$sessionStore?.avatar_url} />
							</div>
						</label>
						<ul
							tabindex="0"
							class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<a class="justify-between">
									Profile
									<span class="badge">New</span>
								</a>
							</li>
							<li><button>Settings</button></li>
							{#if $sessionStore !== null}
								<li><button on:click={signOut}>Logout</button></li>
							{:else}
								<li><button on:click={signOut}>Login</button></li>
							{/if}
						</ul>
					</div>
				</div>
			</div>
		</header>
		<main>
			<slot />
		</main>
	</div>
	<div class="drawer-side">
		<label for="main-drawer" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-200 text-base-content">
			<!-- Sidebar content here -->
			<li><a href="summer">Who's in New Haven</a></li>
			<li><a href="map">Map (Place Yourself on a Map, find Yalies Near Me)</a></li>
			<li><a href="rides">Ride Share</a></li>
			<li><a href="meals">Track Meals</a></li>
			<li><a href="butteries">Butteries</a></li>
		</ul>
	</div>
</div>

<!-- <footer>
	<p>Made with love and <span>❤️</span> by Braden</p>
</footer> -->
<style></style>
