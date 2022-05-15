export async function get(request: { params: { query: string } }) {
	// const { query } = params;
	try {
		// const res = await fetch(
		// 	`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=${
		// 		import.meta.env.VITE_GOOGLE_MAP_KEY
		// 	}`
		// );
		// const data: GooglePlacesRequest = await res.json();
		// console.log('🚀 ~ file: LocationAutoComplete.svelte ~ line 30 ~ .then ~ results', results);
		return {
			status: 200,
			body: request
			// body: data
		};
	} catch (err) {
		// loading = false;
		return { status: 404 };
	}
}
