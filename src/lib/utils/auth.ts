import {supabase} from "$lib/utils/supabaseClient";
import type {ApiError} from "@supabase/supabase-js";

export let loading = false;
export const signIn = async () => {
	try {
		loading = true;
		const {error} = await supabase.auth.signIn({provider: 'google'});
		if (error) throw error;
	} catch (error) {
		if ((error as ApiError).message) {
			alert((error as ApiError).message);
		}
	} finally {
		loading = false;
	}
};

export async function signOut() {
	try {
		loading = true;
		const {error} = await supabase.auth.signOut();
		if (error)
			throw error;
	} catch (error) {
		if ((error as ApiError).message) {
			alert((error as ApiError).message);
		}
	} finally {
		loading = false;
	}
}

