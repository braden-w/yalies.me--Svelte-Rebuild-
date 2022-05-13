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

<button class="btn btn-primary btn-lg btn-block"> Sign in with Google </button>

      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div id="g_id_onload"
         data-client_id="YOUR_GOOGLE_CLIENT_ID"
         data-login_uri="https://your.domain/your_login_endpoint"
         data-auto_prompt="false">
      </div>
      <div class="g_id_signin"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="rectangular"
         data-logo_alignment="left">
      </div>
  </body>

<button
	type="button"
	class="  text-white bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
	on:click={handleLogin}
>
	<svg
		class="w-4 h-4 mr-2 -ml-1"
		aria-hidden="true"
		focusable="false"
		data-prefix="fab"
		data-icon="google"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 488 512"
		><path
			fill="currentColor"
			d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
		/></svg
	>
	Sign in with Google
</button>
