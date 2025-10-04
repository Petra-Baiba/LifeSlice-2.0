import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Trash2, Clock, Zap, CreditCard as Edit3 } from 'lucide-react';
import { Activity, TimePeriod } from '../types';
import { getEnergyColor, getActivityTotalTime } from '../utils/energyCalculations';

interface ActivityLegendProps {
  activities: Activity[];
  timePeriod: TimePeriod;
  onDeleteActivity: (id: string) => void;
  onClearAll: () => void;
  onEditActivity: (activity: Activity) => void;
  onReorderActivities: (activities: Activity[]) => void;
}

export const ActivityLegend: React.FC<ActivityLegendProps> = ({ 
  activities, 
  timePeriod,
  onDeleteActivity,
  onClearAll,
  onEditActivity,
  onReorderActivities
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(activities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorderActivities(items);
  };

  const formatTime = (totalHours: number): string => {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return '0m';
  };

  const getFrequencyLabel = (frequency: string): string => {
    switch (frequency) {
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      default: return 'Once';
    }
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Activity Legend</h3>
        <p className="text-gray-500 text-center py-8">
          Add activities to see them listed here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Activity Legend</h3>
      
      {/* Clear All Button */}
      {activities.length > 0 && (
        <div className="mb-6">
          <button
            onClick={onClearAll}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-xl font-medium transition-all text-sm"
          >
            <Trash2 size={16} />
            Clear All Activities
          </button>
        </div>
      )}
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="activities">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {activities.map((activity, index) => (
                <Draggable key={activity.id} draggableId={activity.id} index={index}>
                  {(provided, snapshot) => (
                    <>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex items-center gap-4 p-4 bg-gray-50 rounded-xl transition-colors cursor-move ${
                        snapshot.isDragging ? 'shadow-lg bg-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {/* Color indicator */}
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getEnergyColor(activity.energyLevel) }}
                      />
                      
                      {/* Activity info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-800 truncate">
                            {activity.name}
                          </h4>
                          {activity.isMandatory && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex-shrink-0">
                              Mandatory
                            </span>
                          )}
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex-shrink-0">
                            {getFrequencyLabel(activity.frequency)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{formatTime(getActivityTotalTime(activity, timePeriod))}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap size={14} />
                            <span className={activity.energyLevel > 0 ? 'text-green-600' : activity.energyLevel < 0 ? 'text-red-600' : 'text-gray-600'}>
                              {activity.energyLevel > 0 ? '+' : ''}{activity.energyLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => onEditActivity(activity)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit activity"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteActivity(activity.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete activity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    </>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};