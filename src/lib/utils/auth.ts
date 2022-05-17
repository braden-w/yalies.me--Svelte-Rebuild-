import {goto} from "$app/navigation";
import {supabase} from "$lib/utils/supabaseClient";
import type {ApiError} from "@supabase/supabase-js";
import {writable, type Writable} from "svelte/store";

export const loading: Writable<boolean> = writable(false);
export const signIn = async () => {
	try {
		loading.set(true);
		const {error} = await supabase.auth.signIn({provider: 'google'});
		if (error) throw error;
	} catch (error) {
		if ((error as ApiError).message) {
			alert((error as ApiError).message);
		}
	} finally {
		loading.set(false);
		goto('/');
	}
};

export async function signOut() {
	try {
		loading.set(true);
		const {error} = await supabase.auth.signOut();
		if (error)
			throw error;
	} catch (error) {
		if ((error as ApiError).message) {
			alert((error as ApiError).message);
		}
	} finally {
		loading.set(false);
	}
}

