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

<div class="hero min-h-screen">
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md align-center">
			<h1 class="mb-5 text-5xl font-bold">Yalies Around Me</h1>
			<p class="mb-5">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
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
