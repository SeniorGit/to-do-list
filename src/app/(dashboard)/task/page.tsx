"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { FormTask } from "./_component/formtask"
import { useFetchTask } from "@/lib/action/task/actionTask"
import { CardTask } from "./_component/cardTAsk"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Plus, RefreshCw, AlertCircle, Calendar } from 'lucide-react';
import { useState } from "react"
import { Task } from "@/types/typeTask"

interface TaskPageProps {
  selectedDate?: Date | null;
  externalTasks?: Task[]; 
}

export default function TaskPage({ selectedDate, externalTasks }: TaskPageProps) {
  const { tasks: fetchedTasks, fetchTasks, deleteTask, updateTask, addTask, loading, error } = useFetchTask(); 
  const tasks = externalTasks || fetchedTasks;
  
  const filteredTasks = selectedDate ? tasks.filter(task => {
    if (!task.due_date) return false;
    const taskDate = new Date(task.due_date);
    return (
      taskDate.getDate() === selectedDate.getDate() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getFullYear() === selectedDate.getFullYear()
    );
  }) : tasks;

  // auto close for add new task
  const [isOpen, setIsOpen] = useState(false);
  const handleTaskAdded = async () => {
    await fetchTasks(); 
    setIsOpen(false); 
  };
  
  // Task skeleton
  const TaskSkeleton = () => (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4">
          <div className="flex items-start space-x-3">
            <Skeleton className="h-5 w-5 rounded mt-1" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
              <div className="flex space-x-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  // count complete task, total task, and percentage - based on FILTERED tasks
  const completedTasks = filteredTasks.filter(t => t.is_completed).length;
  const totalTasks = filteredTasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card>
      {/* header content */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Task Manager
            {selectedDate && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                <Calendar className="h-3 w-3 mr-1" />
                {selectedDate.toLocaleDateString()}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            {selectedDate 
              ? `Tasks due on ${selectedDate.toLocaleDateString()}`
              : "Organize and track your daily tasks"
            }
          </CardDescription>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* refresh button */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchTasks}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          
          {/* add new task */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to your todo list and stay organized.
                </DialogDescription>
              </DialogHeader>
              <FormTask 
                onTaskAdded={handleTaskAdded} 
                onAddTask={addTask}
              />
            </DialogContent>
          </Dialog>
          
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Stats Percentage, Completion, and Task count */}
        {filteredTasks.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <div className="text-sm font-medium">
                {selectedDate ? "Date Progress" : "Overall Progress"}
              </div>
              <div className="text-2xl font-bold">{completionPercentage}%</div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-sm text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
                {selectedDate && " on this date"}
              </div>
              <Badge variant={completionPercentage === 100 ? "default" : "secondary"}>
                {completionPercentage === 100 ? "All done! 🎉" : "In progress"}
              </Badge>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <div className="font-medium text-destructive">Error loading tasks</div>
                <div className="text-sm text-destructive/80">{error}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State With Skeleton*/}
        {loading && filteredTasks.length === 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 py-4">
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">
                {selectedDate ? "Loading tasks for selected date..." : "Loading your tasks..."}
              </span>
            </div>
            <TaskSkeleton />
          </div>
        ) : (
          <>
            <CardTask 
              tasks={filteredTasks} 
              onDelete={deleteTask}
              onUpdate={updateTask}
              onRefresh={fetchTasks}
            />
            
            {/* Empty task board */}
            {filteredTasks.length === 0 && !loading && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    {selectedDate ? (
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    ) : (
                      <Plus className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedDate ? "No tasks for this date" : "No tasks yet"}
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    {selectedDate 
                      ? `No tasks are due on ${selectedDate.toLocaleDateString()}. Create a new task or check other dates.`
                      : "Get started by creating your first task to stay organized and productive."
                    }
                  </p>
                  {/* add new task if task empty */}
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>New Task</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>
                          {selectedDate 
                            ? `Add a new task due on ${selectedDate.toLocaleDateString()}`
                            : "Add a new task to your todo list and stay organized."
                          }
                        </DialogDescription>
                      </DialogHeader>
                      <FormTask 
                        onTaskAdded={handleTaskAdded} 
                        onAddTask={addTask}
                        initialDueDate={selectedDate} 
                      />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}