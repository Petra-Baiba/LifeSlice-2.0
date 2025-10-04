import React from 'react';
import { Clock, BarChart3, Scale } from 'lucide-react';
import { EnergyBalance as EnergyBalanceType, Activity, TimePeriod } from '../types';
import { getTimePeriodConfig, getTotalTime } from '../utils/energyCalculations';

interface EnergyBalanceProps {
  energyBalance: EnergyBalanceType;
  activities: Activity[];
  timePeriod: TimePeriod;
}

export const EnergyBalance: React.FC<EnergyBalanceProps> = ({ energyBalance, activities, timePeriod }) => {
  const { positive, negative, net } = energyBalance;
  
  const periodConfig = getTimePeriodConfig(timePeriod);
  const totalHours = getTotalTime(activities, timePeriod);
  const timePercentage = ((totalHours / periodConfig.totalHours) * 100).toFixed(1);
  
  const getBalanceStatus = (netEnergy: number): string => {
    if (netEnergy <= -5) return 'Burned';
    if (netEnergy >= -4 && netEnergy <= -1) return 'Draining';
    if (netEnergy >= 0 && netEnergy <= 3) return 'Neutral';
    if (netEnergy >= 4 && netEnergy <= 8) return 'Balanced';
    return 'Energized';
  };

  const getBalanceColor = (netEnergy: number): string => {
    if (netEnergy <= -5) return 'text-red-600';
    if (netEnergy >= -4 && netEnergy <= -1) return 'text-orange-600';
    if (netEnergy >= 0 && netEnergy <= 3) return 'text-gray-600';
    if (netEnergy >= 4 && netEnergy <= 8) return 'text-blue-600';
    return 'text-green-600';
  };

  const getBalanceWord = (netEnergy: number): string => {
    if (netEnergy <= -8) return 'Extremely Draining';
    if (netEnergy >= -7 && netEnergy <= -4) return 'Very Draining';
    if (netEnergy >= -3 && netEnergy <= -1) return 'Somewhat Draining';
    if (netEnergy >= 0 && netEnergy <= 1) return 'Neutral';
    if (netEnergy >= 2 && netEnergy <= 4) return 'Somewhat Energizing';
    if (netEnergy >= 5 && netEnergy <= 7) return 'Very Energizing';
    return 'Extremely Energizing';
  };
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-8">Energy Status</h3>
      
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Time Used */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Clock className="text-gray-500" size={24} />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {timePercentage}%
          </div>
          <div className="text-sm text-gray-500 mb-2">Time Used</div>
          <div className="text-lg font-semibold text-gray-700 mb-3">
            {totalHours.toFixed(1)}h / {periodConfig.totalHours}h
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(parseFloat(timePercentage), 100)}%` }}
            />
          </div>
        </div>


        {/* Activities */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <BarChart3 className="text-gray-500" size={24} />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {activities.length}
          </div>
          <div className="text-sm text-gray-500 mb-2">Activities</div>
          <div className="text-lg font-semibold text-gray-700">
            {activities.length === 1 ? '1 Activity' : `${activities.length} Activities`}
          </div>
        </div>
      </div>
      
      {/* Energy Balance Section - Full Width */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <Scale className="text-blue-500" size={24} />
        </div>
        <div className={`text-xl font-bold mb-2`} style={{ color: getScaleColor(net) }}>
          {getBalanceWord(net)}
        </div>
      </div>
      
      {/* Energy Scale - Full Width */}
      <div className="w-full">
        <EnergyScale netEnergy={net} getScaleColor={getScaleColor} />
      </div>
    </div>
  );

  // Move getScaleColor function here so it can be used by both components
  function getScaleColor(netEnergy: number): string {
    if (netEnergy < -2) return '#dc2626'; // red
    if (netEnergy > 2) return '#16a34a'; // green
    return '#6b7280'; // gray for balanced
  }
};

const EnergyScale: React.FC<{ netEnergy: number; getScaleColor: (energy: number) => string }> = ({ netEnergy, getScaleColor }) => {
  // Normalize energy to a scale position (-100 to +100)
  const maxEnergy = 20; // Adjust based on typical energy ranges
  const normalizedEnergy = Math.max(-100, Math.min(100, (netEnergy / maxEnergy) * 100));
  
  // Calculate needle position (0-100, where 50 is center)
  const needlePosition = 50 + (normalizedEnergy / 2);
  
  return (
    <div className="relative w-full h-20">
      {/* Scale background */}
      <div className="absolute bottom-8 w-full h-4 bg-gradient-to-r from-red-500 via-gray-300 to-green-500 rounded-full shadow-inner"></div>
    
      
      {/* Needle */}
      <div 
        className="absolute bottom-8 w-[2px] h-12 transition-all duration-500 transform -translate-x-1"
        style={{ 
          left: `${needlePosition}%`,
          backgroundColor: getScaleColor(netEnergy),
          transformOrigin: 'bottom center'
        }}
      >
        {/* Needle tip */}
        <div 
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 shadow-lg"
          style={{ backgroundColor: getScaleColor(netEnergy) }}
        ></div>
      </div>
      
      {/* Scale labels */}
      <div className="absolute bottom-0 left-0 text-sm font-medium text-red-600">Draining</div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">Balanced</div>
      <div className="absolute bottom-0 right-0 text-sm font-medium text-green-600">Energizing</div>
    </div>
  );
};
