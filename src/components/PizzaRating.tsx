import React from 'react';
import { Star, Award, Lightbulb } from 'lucide-react';
import { PizzaRating as PizzaRatingType, Activity } from '../types';

interface PizzaRatingProps {
  rating: PizzaRatingType;
  activities: Activity[];
}

export const PizzaRating: React.FC<PizzaRatingProps> = ({ rating, activities }) => {
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={24}
        className={`${
          i < count 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        } transition-colors`}
      />
    ));
  };

  // Get top 3 energizing non-mandatory activities
  const energizingActivities = activities
    .filter(activity => !activity.isMandatory && activity.energyLevel > 0)
    .sort((a, b) => b.energyLevel - a.energyLevel)
    .slice(0, 3);

  const getRatingColor = (stars: number) => {
    if (stars <= 2) return 'from-red-500 to-orange-500';
    if (stars === 3) return 'from-yellow-500 to-amber-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      
      {/* Recommendations */}
      {energizingActivities.length > 0 && (
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-blue-600" size={20} />
            <h4 className="font-semibold text-gray-800">Top Energy Boosters</h4>
          </div>
          <div className="space-y-2">
            {energizingActivities.map((activity, index) => (
              <div key={activity.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">
                  #{index + 1} {activity.name}
                </span>
                <span className="text-green-600 font-medium">
                  +{activity.energyLevel}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
};