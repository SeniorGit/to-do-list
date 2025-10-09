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
import { Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { useState } from "react"

export default function TaskPage() {
  const { tasks, fetchTasks, deleteTask, updateTask, addTask, loading, error } = useFetchTask(); 
  
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

  // count complate tast, total task, and persentage
  const completedTasks = tasks.filter(t => t.is_completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card>
      {/* header content */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-2xl font-bold">Task Manager</CardTitle>
          <CardDescription>
            Organize and track your daily tasks
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
        {/* Progress Stats Persentage, Complatation, and Task count */}
        {tasks.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <div className="text-sm font-medium">Progress</div>
              <div className="text-2xl font-bold">{completionPercentage}%</div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-sm text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
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
        {loading && tasks.length === 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 py-4">
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Loading your tasks...</span>
            </div>
            <TaskSkeleton />
          </div>
        ) : (
          <>
            <CardTask 
              tasks={tasks} 
              onDelete={deleteTask}
              onUpdate={updateTask}
              onRefresh={fetchTasks}
            />
            
            {/* Empty empty task board */}
            {tasks.length === 0 && !loading && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    Get started by creating your first task to stay organized and productive.
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
                          Add a new task to your todo list and stay organized.
                        </DialogDescription>
                      </DialogHeader>
                      <FormTask 
                        onTaskAdded={handleTaskAdded} 
                        onAddTask={addTask}
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