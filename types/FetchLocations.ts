export interface FetchLocations {
	description: string;
	lat: number;
	lng: number;
	people: Person[];
}

export interface Person {
	id: string;
	name: string;
	avatar_url: string;
}
