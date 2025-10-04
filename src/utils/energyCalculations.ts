import { Activity, EnergyBalance, PizzaRating, TimePeriod } from '../types';

export const getTimePeriodConfig = (period: TimePeriod) => {
  switch (period) {
    case '24h':
      return { label: '24 Hours', totalHours: 24, maxHours: 24 };
    case '1week':
      return { label: '1 Week', totalHours: 168, maxHours: 168 };
    case '1month':
      return { label: '1 Month', totalHours: 720, maxHours: 720 };
    case '1year':
      return { label: '1 Year', totalHours: 8760, maxHours: 8760 };
  }
};

export const getActivityTotalTime = (activity: Activity, period: TimePeriod): number => {
  const baseHours = activity.hours + (activity.minutes / 60);
  
  switch (activity.frequency) {
    case 'once':
      return baseHours;
    case 'daily':
      switch (period) {
        case '24h': return baseHours;
        case '1week': return baseHours * 7;
        case '1month': return baseHours * 30;
        case '1year': return baseHours * 365;
      }
      break;
    case 'weekly':
      switch (period) {
        case '24h': return baseHours / 7;
        case '1week': return baseHours;
        case '1month': return baseHours * 4;
        case '1year': return baseHours * 52;
      }
      break;
    case 'monthly':
      switch (period) {
        case '24h': return baseHours / 30;
        case '1week': return baseHours / 4;
        case '1month': return baseHours;
        case '1year': return baseHours * 12;
      }
      break;
  }
  return baseHours;
};

export const calculateEnergyBalance = (activities: Activity[], period: TimePeriod = '24h'): EnergyBalance => {
  let positive = 0;
  let negative = 0;
  
  activities.forEach(activity => {
    const totalHours = getActivityTotalTime(activity, period);
    const energyContribution = activity.energyLevel * totalHours;
    
    if (energyContribution > 0) {
      positive += energyContribution;
    } else {
      negative += Math.abs(energyContribution);
    }
  });
  
  return {
    positive: Math.round(positive * 10) / 10,
    negative: Math.round(negative * 10) / 10,
    net: Math.round((positive - negative) * 10) / 10
  };
};

export const getPizzaRating = (netEnergy: number): PizzaRating => {
  if (netEnergy <= -8) {
    return { stars: 1, label: "Burned Crust", description: "Your day is overcooked! Too much drain." };
  } else if (netEnergy >= -7 && netEnergy <= -3) {
    return { stars: 2, label: "Too Much Ketchup", description: "Heavy on the draining activities today." };
  } else if (netEnergy >= -2 && netEnergy <= 1) {
    return { stars: 3, label: "Edible But Bland", description: "Your day is neutral, but could use more energy!" };
  } else if (netEnergy >= 2 && netEnergy <= 6) {
    return { stars: 4, label: "Balanced", description: "Great energy balance! You're optimizing well." };
  } else {
    return { stars: 5, label: "Chef's Kiss", description: "Outstanding energy optimization! You're a master!" };
  }
};

export const getTotalTime = (activities: Activity[], period: TimePeriod = '24h'): number => {
  return activities.reduce((total, activity) => {
    return total + getActivityTotalTime(activity, period);
  }, 0);
};

export const getEnergyColor = (energyLevel: number): string => {
  // Enhanced color spectrum with better gradation
  if (energyLevel <= -5) return '#7f1d1d'; // red-900 (darkest red)
  if (energyLevel === -4) return '#dc2626'; // red-600
  if (energyLevel === -3) return '#f87171'; // red-400 (lighter)
  if (energyLevel === -2) return '#fca5a5'; // red-300 (paler)
  if (energyLevel === -1) return '#fecaca'; // red-200 (very pale)
  if (energyLevel === 0) return '#e5e7eb'; // gray-200 (neutral pale)
  if (energyLevel === 1) return '#bbf7d0'; // green-200 (very pale)
  if (energyLevel === 2) return '#86efac'; // green-300 (pale)
  if (energyLevel === 3) return '#4ade80'; // green-400 (lighter)
  if (energyLevel === 4) return '#22c55e'; // green-500
  return '#15803d'; // green-700 (darkest green)
};