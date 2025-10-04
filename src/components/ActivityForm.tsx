import React, { useState } from 'react';
import { Plus, CreditCard as Edit3, Sparkles, X } from 'lucide-react';
import { Activity } from '../types';

interface ActivityFormProps {
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
  editingActivity?: Activity | null;
  onUpdateActivity?: (activity: Activity) => void;
  onCancelEdit?: () => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ 
  onAddActivity, 
  editingActivity, 
  onUpdateActivity, 
  onCancelEdit 
}) => {
  const quickActivities = [
    { name: 'Qwasar Bootcamp Grind', hours: 8, minutes: 0, energyLevel: -5, isMandatory: true, frequency: 'daily' as const },
    { name: 'Daily StandUp Comedy', hours: 0, minutes: 15, energyLevel: 2.5, isMandatory: true, frequency: 'daily' as const },
    { name: 'Debug Hell (Population: You)', hours: 2, minutes: 0, energyLevel: -3, isMandatory: false, frequency: 'daily' as const },
    { name: 'Stack Overflow Salvation', hours: 0, minutes: 45, energyLevel: -1, isMandatory: false, frequency: 'daily' as const },
    { name: 'Sacred Coffee Ritual', hours: 0, minutes: 15, energyLevel: 2, isMandatory: false, frequency: 'daily' as const },
    { name: 'Code Review Roast Session', hours: 1, minutes: 0, energyLevel: -2, isMandatory: false, frequency: 'daily' as const },
    { name: 'Rubber Duck Therapy', hours: 0, minutes: 20, energyLevel: 1, isMandatory: false, frequency: 'daily' as const },
    { name: 'Git Merge Conflict PTSD', hours: 0, minutes: 30, energyLevel: -4, isMandatory: false, frequency: 'weekly' as const },
    { name: 'Demo Day Panic Prep', hours: 3, minutes: 0, energyLevel: -2, isMandatory: false, frequency: 'weekly' as const },
    { name: 'Pitch Like a Boss', hours: 1, minutes: 0, energyLevel: 1, isMandatory: false, frequency: 'weekly' as const },
    { name: 'Hackathon Madness', hours: 12, minutes: 0, energyLevel: 3, isMandatory: false, frequency: 'monthly' as const },
    { name: 'Professional Procrastination', hours: 1, minutes: 30, energyLevel: -2, isMandatory: false, frequency: 'daily' as const },
    { name: 'YouTube "Learning" Rabbit Hole', hours: 2, minutes: 0, energyLevel: 0, isMandatory: false, frequency: 'daily' as const },
    { name: 'Zen & The Art of Not Crying', hours: 0, minutes: 20, energyLevel: 3, isMandatory: false, frequency: 'daily' as const },
    { name: 'Pair Programming Bromance', hours: 2, minutes: 0, energyLevel: 1, isMandatory: false, frequency: 'daily' as const },
    { name: 'Sprint Planning Torture', hours: 1, minutes: 30, energyLevel: -1, isMandatory: false, frequency: 'weekly' as const },
    { name: 'Bug Safari Adventure', hours: 1, minutes: 0, energyLevel: -2, isMandatory: false, frequency: 'daily' as const },
    { name: 'Refactoring Feng Shui', hours: 2, minutes: 0, energyLevel: 0, isMandatory: false, frequency: 'weekly' as const },
    { name: 'Tech Talk Enlightenment', hours: 1, minutes: 0, energyLevel: 2, isMandatory: false, frequency: 'weekly' as const },
    { name: 'Startup Pitch Shark Tank', hours: 0, minutes: 30, energyLevel: 3, isMandatory: false, frequency: 'monthly' as const },
    { name: 'Networking Awkward Small Talk', hours: 3, minutes: 0, energyLevel: 1, isMandatory: false, frequency: 'monthly' as const },
    { name: 'Deploy & Pray Ceremony', hours: 0, minutes: 45, energyLevel: -3, isMandatory: false, frequency: 'weekly' as const },
    { name: 'New Framework Stockholm Syndrome', hours: 4, minutes: 0, energyLevel: 0, isMandatory: false, frequency: 'weekly' as const },
    { name: 'Chat with Gandalf the Code', hours: 0, minutes: 30, energyLevel: 2, isMandatory: false, frequency: 'daily' as const },
  ];

  const [showAllActivities, setShowAllActivities] = useState(false);
  const [name, setName] = useState(editingActivity?.name || '');
  const [hours, setHours] = useState(editingActivity?.hours || 0);
  const [minutes, setMinutes] = useState(editingActivity?.minutes || 0);
  const [energyLevel, setEnergyLevel] = useState(editingActivity?.energyLevel || 0);
  const [isMandatory, setIsMandatory] = useState(editingActivity?.isMandatory || false);
  const [frequency, setFrequency] = useState<'once' | 'daily' | 'weekly' | 'monthly'>(editingActivity?.frequency || 'once');

  // Update form when editingActivity changes
  React.useEffect(() => {
    if (editingActivity) {
      setName(editingActivity.name);
      setHours(editingActivity.hours);
      setMinutes(editingActivity.minutes);
      setEnergyLevel(editingActivity.energyLevel);
      setIsMandatory(editingActivity.isMandatory);
      setFrequency(editingActivity.frequency);
    } else {
      // Reset form when not editing
      setName('');
      setHours(0);
      setMinutes(0);
      setEnergyLevel(0);
      setIsMandatory(false);
      setFrequency('once');
    }
  }, [editingActivity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || (hours === 0 && minutes === 0)) return;
    
    if (editingActivity && onUpdateActivity) {
      onUpdateActivity({
        ...editingActivity,
        name: name.trim(),
        hours,
        minutes,
        energyLevel,
        isMandatory,
        frequency
      });
    } else {
      onAddActivity({
        name: name.trim(),
        hours,
        minutes,
        energyLevel,
        isMandatory,
        frequency
      });
    }
    
    // Reset form
    setName('');
    setHours(0);
    setMinutes(0);
    setEnergyLevel(0);
    setIsMandatory(false);
    setFrequency('once');
  };

  const handleQuickSelect = (preset: typeof quickActivities[0]) => {
    setName(preset.name);
    setHours(preset.hours);
    setMinutes(preset.minutes);
    setEnergyLevel(preset.energyLevel);
    setIsMandatory(preset.isMandatory);
    setFrequency(preset.frequency);
  };

  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const getEnergyLabel = (level: number): string => {
    if (level <= -4) return 'Extremely Draining';
    if (level === -3) return 'Very Draining';
    if (level === -2) return 'Draining';
    if (level === -1) return 'Somewhat Draining';
    if (level === 0) return 'Neutral';
    if (level === 1) return 'Somewhat Energizing';
    if (level === 2) return 'Energizing';
    if (level === 3) return 'Very Energizing';
    if (level === 4) return 'Highly Energizing';
    return 'Peak Energy';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingActivity ? 'Edit Activity' : 'Add Daily Activity'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning workout, Team meeting"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Quick Activity Bubbles - Moved here */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Add</h3>
          <div className="flex flex-wrap gap-2">
            {quickActivities.slice(0, showAllActivities ? quickActivities.length : 12).map((activity, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleQuickSelect(activity)}
                className="px-3 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-xs font-medium transition-colors border border-gray-200 hover:border-blue-300"
              >
                {activity.name}
              </button>
            ))}
            {quickActivities.length > 12 && (
              <button
                type="button"
                onClick={() => setShowAllActivities(!showAllActivities)}
                className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 rounded-full text-xs font-medium transition-colors border border-blue-300 hover:border-blue-400"
              >
                {showAllActivities ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hours
            </label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Math.max(0, Math.min(24, parseInt(e.target.value) || 0)))}
              min="0"
              max="24"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minutes
            </label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              min="0"
              max="59"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How energized or depleted do you usually feel after this activity?
          </label>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Energy Level: {energyLevel > 0 ? '+' : ''}{energyLevel} ({getEnergyLabel(energyLevel)})
          </label>
          <input
            type="range"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
            min="-5"
            max="5"
            className="w-full h-3 bg-gradient-to-r from-red-500 via-gray-400 to-green-500 rounded-lg appearance-none slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Very Draining (-5)</span>
            <span>Neutral (0)</span>
            <span className="text-green-600">Very Energizing (+5)</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as 'once' | 'daily' | 'weekly' | 'monthly')}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="once">One-time activity</option>
            <option value="daily">Daily (repeats every day)</option>
            <option value="weekly">Weekly (repeats every week)</option>
            <option value="monthly">Monthly (repeats every month)</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="mandatory"
            checked={isMandatory}
            onChange={(e) => setIsMandatory(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="mandatory" className="ml-3 text-sm font-medium text-gray-700">
            This is a mandatory activity (sleep, work, commute)
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!name.trim() || (hours === 0 && minutes === 0)}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {editingActivity ? <Edit3 size={20} /> : <Plus size={20} />}
            {editingActivity ? 'Update Activity' : 'Add Activity'}
          </button>
          
          {editingActivity && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-xl font-medium transition-all duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
    </div>
  );
};