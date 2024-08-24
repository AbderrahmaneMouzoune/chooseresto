export interface GoogleApiResponse {
  business_status: string;
  name: string;
  photos: GoogleMapsPhotos[];
  rating: number;
  types: string[];
  vicinity: string;
  price_level: number;
  place_id: string;
}

export interface GoogleMapsPhotos {
  height: number;
  photo_reference: string;
  width: number;
}
