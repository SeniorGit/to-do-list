'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import ProtectedRoute from '@/lib/auth/protectedRoute';
import { Task } from '@/types/typeTask';
import TaskPage from '../task/page';
import TaskCalendar from '../component/calendar';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { 
  RefreshCw,
} from 'lucide-react';
import Profile from '../component/profile';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setMounted(true);
    if (user) {
      fetchTasks();
    }
  }, [user]);

  // Filter tasks when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const filtered = tasks.filter(task => {
        if (!task.due_date) return false;
        const taskDate = new Date(task.due_date);
        return (
          taskDate.getDate() === selectedDate.getDate() &&
          taskDate.getMonth() === selectedDate.getMonth() &&
          taskDate.getFullYear() === selectedDate.getFullYear()
        );
      });
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [selectedDate, tasks]);

  const fetchTasks = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setTasks(data);
          setFilteredTasks(data);
        } else if (data && Array.isArray(data.tasks)) {
          setTasks(data.tasks);
          setFilteredTasks(data.tasks);
        } else if (data && Array.isArray(data.data)) {
          setTasks(data.data);
          setFilteredTasks(data.data);
        } else {
          console.warn('Unexpected response format:', data);
          setTasks([]); 
          setFilteredTasks([]);
        }
      } else if (response.status === 401) {
        logout();
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setTasks([]); 
      setFilteredTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInitials = (username?: string) => {
    return username ? username.charAt(0).toUpperCase() : 'U';
  };

  if (!mounted) return null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-14 w-14 border-4 border-white/20 shadow-lg">
                  <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} />
                  <AvatarFallback className="bg-white text-amber-600 text-lg font-bold">
                    {getUserInitials(user?.username)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Welcome back, <span className="text-white">{user?.username}</span>! 
                  </h1>
                  <p className="text-amber-100 text-sm md:text-base">
                    {selectedDate 
                      ? `Viewing tasks for ${selectedDate.toLocaleDateString()}`
                      : tasks.length > 0 
                        ? `You're crushing it! ${tasks.filter(t => t.is_completed).length} tasks completed.` 
                        : "Ready to conquer your day? Let's get started!"
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={fetchTasks}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border-white/20"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar Stats */}
          <div className="xl:col-span-1 space-y-6">
            {/* User Stats Card */}
            <Profile/>
            {/* Task Calendar Component */}
            <TaskCalendar 
              tasks={tasks} 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />

           
          </div>

          {/* Tasks Section */}
          <div className="xl:col-span-3 space-y-6" id="task-section">
            {/* Task Page Component */}
            <div>
              <TaskPage 
                selectedDate={selectedDate}
                externalTasks={selectedDate ? filteredTasks : undefined}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}