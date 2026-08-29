import type { CarDetailData } from '@/data/carDetails';

export type VehicleFilter = {
  categories: string[];
  maxPriceLakhs?: number;
  fuelTypes: string[];
  seating?: number;
  query: string;
};

export type VehicleSummary = Pick<CarDetailData, 'slug' | 'name' | 'fullName' | 'image' | 'category' | 'basePrice' | 'variants' | 'specs'>;

