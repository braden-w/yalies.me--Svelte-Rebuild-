<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let loading = false;

	const handleLogin = async () => {
		try {
			loading = true;
			const { user, session, error } = await supabase.auth.signIn({ provider: 'google' });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error: any) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div
	id="g_id_onload"
	data-client_id="YOUR_GOOGLE_CLIENT_ID"
	data-login_uri="https://your.domain/your_login_endpoint"
	data-auto_prompt="false"
/>
<div
	class="g_id_signin"
	data-type="standard"
	data-size="large"
	data-theme="outline"
	data-text="sign_in_with"
	data-shape="rectangular"
	data-logo_alignment="left"
/>
