interface MatchedSubstring {
	length: number;
	offset: number;
}
interface StructuredFormatting {
	main_text: string;
	main_text_matched_substrings: MatchedSubstring[];
	secondary_text: string;
}

interface Term {
	offset: number;
	value: string;
}

enum Type {
	Geocode = 'geocode',
	Locality = 'locality',
	Political = 'political'
}

interface Prediction {
	description: string;
	matched_substrings: MatchedSubstring[];
	place_id: string;
	reference: string;
	structured_formatting: StructuredFormatting;
	terms: Term[];
	types: Type[];
}

export interface MapAutoCompleteRequest {
	predictions: Prediction[];
	status: string;
}
