<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let loading = false;

	const handleLogin = async () => {
		try {
			loading = true;
			const { user, session, error } = await supabase.auth.signIn({ provider: 'google' });
			if (error) throw error;
		} catch (error: any) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<div
	class="hero min-h-screen"
	style="background-image: url(https://api.lorem.space/image/fashion?w=1000&h=800);"
>
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">Hello there</h1>
			<p class="mb-5">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<button class="btn btn-primary">Get Started</button>
			<div class="card w-96  shadow-xl">
				<h1 class="text-2xl px-10 pt-10">Yalies Around Me</h1>
				<figure class="px-10 pt-10">
					<img
						src="https://api.lorem.space/image/shoes?w=400&h=225"
						alt="Shoes"
						class="rounded-xl"
					/>
				</figure>
				<div class="card-body items-center text-center">
					<h2 class="card-title">Shoes!</h2>
					<p>If a dog chews shoes whose shoes does he choose?</p>
					<div class="card-actions">
						<button class:loading class="btn" on:click={handleLogin}>
							<div class="left">
								<img
									width="20px"
									style="margin-top:7px; margin-right:8px"
									alt="Google sign-in"
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
								/>
							</div>
							Login with Google
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
