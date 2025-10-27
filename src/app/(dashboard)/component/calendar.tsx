'use client';

import { useState } from 'react';
import { Task } from '@/types/typeTask';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface TaskCalendarProps {
  tasks: Task[];
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
}

export default function TaskCalendar({ tasks, selectedDate, onDateSelect }: TaskCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      if (!task.due_date) return false;
      const taskDate = new Date(task.due_date);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const hasTasksForDate = (date: Date) => {
    return getTasksForDate(date).length > 0;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDate = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    if (isSelectedDate(date)) {
      // Click lagi di date yang sama = reset filter
      onDateSelect(null);
    } else {
      onDateSelect(date);
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      days.push(date);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-900">
            <Calendar className="h-5 w-5" />
            <span>Task Calendar</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription className="text-amber-700">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          {selectedDate && (
            <span className="ml-2 text-amber-600">
              • Viewing {selectedDate.toLocaleDateString()}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-xs font-medium text-gray-500 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center py-1">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => (
            <div
              key={index}
              className={`
                aspect-square p-1 text-xs transition-all duration-200
                ${!date ? 'invisible' : ''}
                ${date && isToday(date) ? 'bg-amber-100 border-2 border-amber-400 rounded-md' : ''}
                ${date && isSelectedDate(date) ? 'bg-amber-200 border-2 border-amber-500 rounded-md shadow-md' : ''}
                ${date && hasTasksForDate(date) ? 'cursor-pointer hover:bg-amber-50 rounded' : 'cursor-pointer'}
                flex flex-col items-center justify-center
              `}
              onClick={() => date && handleDateClick(date)}
            >
              {date && (
                <>
                  <span className={`
                    ${isToday(date) || isSelectedDate(date) ? 'font-bold text-amber-900' : 'text-gray-700'}
                  `}>
                    {date.getDate()}
                  </span>
                  {hasTasksForDate(date) && (
                    <div className="flex space-x-1 mt-1">
                      {getTasksForDate(date).some(t => t.priority === 'high') && (
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      )}
                      {getTasksForDate(date).some(t => t.priority === 'medium') && (
                        <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                      )}
                      {getTasksForDate(date).some(t => !t.priority || t.priority === 'low') && (
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Calendar Legend & Controls */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Low/Normal</span>
            </div>
          </div>

          {selectedDate && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs border-amber-300 text-amber-700 hover:bg-amber-50"
              onClick={() => onDateSelect(null)}
            >
              Show All Tasks
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}