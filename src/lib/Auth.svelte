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

<svelte:head />
<button class="btn darken-4 white" on:click={handleLogin}>
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
