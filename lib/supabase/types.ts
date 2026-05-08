export interface MenuItem {
  id: number;
  name: string;
  price: string;
  emoji: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface OfferItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
  color: string;
  sort_order: number;
  created_at: string;
}

export interface OpeningHour {
  id: number;
  day: string;
  hours: string;
  sort_order: number;
  created_at: string;
}
