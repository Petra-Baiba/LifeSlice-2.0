import React, { useState } from 'react';
import { Clock, Calendar, CalendarDays, Trash2 } from 'lucide-react';
import { Activity, TimePeriod } from '../types';
import { getEnergyColor, getActivityTotalTime, getTimePeriodConfig } from '../utils/energyCalculations';

interface PizzaChartProps {
  activities: Activity[];
  timePeriod: TimePeriod;
  onTimePeriodChange: (period: TimePeriod) => void;
}

export const PizzaChart: React.FC<PizzaChartProps> = ({ 
  activities, 
  timePeriod, 
  onTimePeriodChange
}) => {
  const [hoveredActivity, setHoveredActivity] = useState<Activity | null>(null);
  
  const periodConfig = getTimePeriodConfig(timePeriod);
  const totalHours = activities.reduce((sum, activity) => 
    sum + getActivityTotalTime(activity, timePeriod), 0
  );
  
  const remainingHours = Math.max(0, periodConfig.totalHours - totalHours);
  const size = 300;
  const center = size / 2;
  const radius = 120;
  
  // Cycle through time periods when center is clicked
  const handleCenterClick = () => {
    const periods: TimePeriod[] = ['24h', '1week', '1month', '1year'];
    const currentIndex = periods.indexOf(timePeriod);
    const nextIndex = (currentIndex + 1) % periods.length;
    onTimePeriodChange(periods[nextIndex]);
  };
  
  // Create pie slices
  const slices = [];
  let currentAngle = -90; // Start from top
  
  activities.forEach((activity, index) => {
    const activityHours = getActivityTotalTime(activity, timePeriod);
    const sliceAngle = (activityHours / periodConfig.totalHours) * 360;
    
    if (sliceAngle > 0) {
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      
      const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);
      
      const largeArcFlag = sliceAngle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      slices.push(
        <path
          key={`activity-${index}`}
          d={pathData}
          fill={getEnergyColor(activity.energyLevel)}
          stroke="#ffffff"
          strokeWidth="2"
          className="transition-all duration-200 cursor-pointer hover:opacity-80"
          onMouseEnter={() => setHoveredActivity(activity)}
          onMouseLeave={() => setHoveredActivity(null)}
        />
      );
      
      currentAngle += sliceAngle;
    }
  });
  
  // Add remaining time slice if any
  if (remainingHours > 0) {
    const remainingAngle = (remainingHours / periodConfig.totalHours) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + remainingAngle;
    
    const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = remainingAngle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    slices.push(
      <path
        key="remaining"
        d={pathData}
        fill="#f3f4f6"
        stroke="#ffffff"
        strokeWidth="2"
        className="transition-all duration-200"
      />
    );
  }
  
  const formatTime = (totalHours: number): string => {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return '0m';
  };

  const getTimePeriodIcon = (period: TimePeriod) => {
    switch (period) {
      case '24h': return <Clock size={14} />;
      case '1week': return <Calendar size={14} />;
      case '1month': return <CalendarDays size={14} />;
      case '1year': return <CalendarDays size={14} />;
    }
  };

  const getTimePeriodShortLabel = (period: TimePeriod) => {
    switch (period) {
      case '24h': return '24 H';
      case '1week': return 'Week';
      case '1month': return 'Month';
      case '1year': return 'Year';
    }
  };

  const getFrequencyLabel = (frequency: string): string => {
    switch (frequency) {
      case 'daily': return '(Daily)';
      case 'weekly': return '(Weekly)';
      case 'monthly': return '(Monthly)';
      default: return '';
    }
  };
  
  return (
    <div className="relative">
      <svg width={size} height={size} className="drop-shadow-lg">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="#f9fafb"
          stroke="#e5e7eb"
          strokeWidth="2"
        />
        {slices}
        
        {/* Center circle */}
        <circle
          cx={center}
          cy={center}
          r="50"
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="2"
          className="cursor-pointer hover:fill-blue-50 transition-colors"
        />
        
        {/* Center label */}
        <text
          x={center}
          y={center - 5}
          textAnchor="middle"
          className="text-sm font-bold fill-gray-700 cursor-pointer select-none"
        >
          {getTimePeriodShortLabel(timePeriod)}
        </text>
        <text
          x={center}
          y={center + 8}
          textAnchor="middle"
          className="text-xs fill-gray-500 cursor-pointer select-none"
        >
          PIZZA
        </text>
        
        {/* Invisible clickable area for better UX */}
        <circle
          cx={center}
          cy={center}
          r="50"
          fill="transparent"
          className="cursor-pointer"
          onClick={handleCenterClick}
        />
      </svg>
      
      {/* Tooltip */}
      {hoveredActivity && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs z-10 pointer-events-none">
          <h4 className="font-semibold text-gray-800">
            {hoveredActivity.name} {getFrequencyLabel(hoveredActivity.frequency)}
          </h4>
          <p className="text-sm text-gray-600">
            Time: {formatTime(getActivityTotalTime(hoveredActivity, timePeriod))}
          </p>
          <p className="text-sm text-gray-600">
            Energy: {hoveredActivity.energyLevel > 0 ? '+' : ''}{hoveredActivity.energyLevel}
          </p>
          {hoveredActivity.isMandatory && (
            <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Mandatory
            </span>
          )}
        </div>
      )}
      
      {/* Time remaining indicator */}
      {remainingHours > 0 && (
        <div className="text-center mt-6 text-gray-600">
          <span className="text-sm">
            {formatTime(remainingHours)} remaining
          </span>
        </div>
      )}
      
      {/* Click instruction */}
      <div className="text-center mt-2 text-gray-400">
        <span className="text-xs">
          Click center to change period
        </span>
      </div>
    </div>
  );
};