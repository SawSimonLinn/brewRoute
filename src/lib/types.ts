// A processed subset of the Google Places API PlaceResult
export type Cafe = {
  place_id: string;
  name: string;
  location: google.maps.LatLngLiteral;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  open_now?: boolean;
  isFavorite: boolean;
  reviews?: google.maps.places.PlaceReview[];
  photos?: google.maps.places.PlacePhoto[];
};

export type Favorite = {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  savedAt: string;
};
