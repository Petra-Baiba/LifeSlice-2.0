export interface Activity {
  id: string;
  name: string;
  hours: number;
  minutes: number;
  energyLevel: number;
  isMandatory: boolean;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
}

export interface EnergyBalance {
  positive: number;
  negative: number;
  net: number;
}

export interface PizzaRating {
  stars: number;
  label: string;
  description: string;
}

export type TimePeriod = '24h' | '1week' | '1month' | '1year';

export interface TimePeriodConfig {
  label: string;
  totalHours: number;
  maxHours: number;
}