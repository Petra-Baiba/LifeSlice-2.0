import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Activity, TimePeriod } from '../types';
import { ActivityForm } from './ActivityForm';
import { PizzaChart } from './PizzaChart';
import { ActivityLegend } from './ActivityLegend';
import { EnergyBalance } from './EnergyBalance';
import { PizzaRating } from './PizzaRating';
import { calculateEnergyBalance, getPizzaRating, getTimePeriodConfig } from '../utils/energyCalculations';

export const MainApp: React.FC = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load data from localStorage on initial render
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('energyPizza_activities');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(() => {
    const saved = localStorage.getItem('energyPizza_timePeriod');
    return saved ? (saved as TimePeriod) : '24h';
  });
  
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // Save activities to localStorage whenever they change
  const updateActivities = (newActivities: Activity[]) => {
    setActivities(newActivities);
    localStorage.setItem('energyPizza_activities', JSON.stringify(newActivities));
  };

  // Save time period to localStorage whenever it changes
  const updateTimePeriod = (newPeriod: TimePeriod) => {
    setTimePeriod(newPeriod);
    localStorage.setItem('energyPizza_timePeriod', newPeriod);
  };

  const addActivity = (activityData: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: crypto.randomUUID(),
    };
    updateActivities([...activities, newActivity]);
  };

  const updateActivity = (updatedActivity: Activity) => {
    updateActivities(activities.map(activity => 
      activity.id === updatedActivity.id ? updatedActivity : activity
    ));
    setEditingActivity(null);
  };

  const editActivity = (activity: Activity) => {
    setEditingActivity(activity);
  };

  const cancelEdit = () => {
    setEditingActivity(null);
  };

  const deleteActivity = (id: string) => {
    updateActivities(activities.filter(activity => activity.id !== id));
    // Clear editing state if we're deleting the activity being edited
    if (editingActivity?.id === id) {
      setEditingActivity(null);
    }
  };

  const reorderActivities = (reorderedActivities: Activity[]) => {
    updateActivities(reorderedActivities);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete all activities? This action cannot be undone.')) {
      updateActivities([]);
      localStorage.removeItem('energyPizza_activities');
      localStorage.removeItem('energyPizza_timePeriod');
      setTimePeriod('24h');
    }
  };

  const energyBalance = calculateEnergyBalance(activities, timePeriod);
  const pizzaRating = getPizzaRating(energyBalance.net);
  const periodConfig = getTimePeriodConfig(timePeriod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Link 
              to="/" 
              className="absolute left-4 top-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
            <img 
              src="/Minimalist Logo for LifeSlice App with Lightning Bolt(1) (1).svg" 
              alt="LifeSlice Logo" 
              className="w-20"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              LifeSlice
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Cook your day, balance your life.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-8">
          {/* Left Column */}
          <div className="space-y-8 xl:order-1 order-1">
            <ActivityForm 
              onAddActivity={addActivity}
              editingActivity={editingActivity}
              onUpdateActivity={updateActivity}
              onCancelEdit={cancelEdit}
            />
            <div className="xl:block hidden">
              <ActivityLegend 
                activities={activities} 
                timePeriod={timePeriod}
                onDeleteActivity={deleteActivity}
                onClearAll={clearAllData}
                onEditActivity={editActivity}
                onReorderActivities={reorderActivities}
              />
            </div>
          </div>

          {/* Middle Column - Energy Status (Most Prominent) */}
          <div className="space-y-8 xl:order-2 order-2">
            <EnergyBalance 
              energyBalance={energyBalance} 
              activities={activities} 
              timePeriod={timePeriod} 
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8 xl:order-3 order-3">
            {/* Pizza Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your {periodConfig.label} Pizza
              </h2>
              <div className="flex justify-center">
                <PizzaChart 
                  activities={activities} 
                  timePeriod={timePeriod}
                  onTimePeriodChange={updateTimePeriod}
                />
              </div>
            </div>

            {/* Pizza Rating */}
            <PizzaRating rating={pizzaRating} activities={activities} />
          </div>
        </div>
        
        {/* Mobile Activity Legend - Shows after pizza on mobile */}
        <div className="xl:hidden mt-8">
          <ActivityLegend 
            activities={activities} 
            timePeriod={timePeriod}
            onDeleteActivity={deleteActivity}
            onClearAll={clearAllData}
            onEditActivity={editActivity}
            onReorderActivities={reorderActivities}
          />
        </div>

        {/* Footer */}
        <div className="mt-12 space-y-6">
          {/* User Feedback Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Share Your Feedback</h3>
            <p className="text-gray-600 mb-4">
              Help us improve LifeSlice! Your feedback is valuable to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScRFNaYoLkCBepvi5SVXmGUb0GAcrcuunAhVN2E6Tw551P51A/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-gray-700 font-medium py-3 px-6 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-center"
              >
                Quick Survey
              </a>
            </div>
            <div className="mt-4 text-center">
              <img 
                src="https://media.discordapp.net/attachments/1418554127394541730/1421109158186455131/image.png?ex=68d7d68a&is=68d6850a&hm=8dcb0550c53e0057494b117147ecb3e71ed097251f7faa01d8c74a7f00e98678&=&format=webp&quality=lossless&width=386&height=392"
                alt="QR Code for Quick Survey"
                className="w-32 h-32 mx-auto rounded-lg shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-2">Scan to access survey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};