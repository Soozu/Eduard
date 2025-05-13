export interface City {
  id: string;
  name: string;
  description: string;
  image: string;
  position: [number, number]; // [latitude, longitude]
  rating: number;
  tags: string[];
  isFeatured: boolean;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  position: [number, number]; // [latitude, longitude]
  cityId: string;
  category: PlaceCategory;
  rating: number;
  priceLevel?: PriceLevel;
  tags: string[];
}

export type PlaceCategory = 'restaurant' | 'attraction' | 'accommodation' | 'shopping' | 'nightlife';

export type PriceLevel = 1 | 2 | 3 | 4;

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}