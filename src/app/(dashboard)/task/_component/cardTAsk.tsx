
import { Task } from "@/types/typeTask";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar,
  Folder,
  AlertCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { DeleteConfirm, UpdateDialog } from "./taskCardAction";
import { CardTaskProps } from "@/types/typeCardTask";

export function CardTask({tasks, onDelete, onUpdate, onRefresh}: CardTaskProps) {
  // handle update
  const handleUpdate = async (taskId: number, updates: Partial<Task>) => { 
    await onUpdate(taskId, updates);
    await onRefresh();
  };

  // handle Checkbox
  const handleCheckboxChange = async (taskId: number, completed: boolean) => {
    await handleUpdate(taskId, { is_completed: completed });
  };

  // Priority Icon
  const getPriorityIcon = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return <AlertCircle className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'low': return <CheckCircle2 className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  // priority varioant
  const getPriorityVariant = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-3">
      {/* Generate card from array from DB */}
      {tasks.map((task) => (
        // Task card
        <Card 
          key={task.id} 
          className={`
            group hover:shadow-md transition-all duration-200
            ${task.is_completed ? 'opacity-70 bg-muted/50' : ''}
          `}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              {/* Checkbox and Content */}
              <div className="flex items-start space-x-3 flex-1 min-w-0">

                <Checkbox
                  checked={task.is_completed}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange(task.id, checked as boolean)
                  }
                  className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />

                {/* main content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:gap-2">
                    {/* Card Title */}
                    <CardTitle className={`
                      text-base font-semibold leading-normal break-words
                      ${task.is_completed ? 'line-through text-muted-foreground' : ''}
                    `}>
                      {task.title}
                    </CardTitle>
                    
                    {/* Priority */}
                    {task.priority && (
                      <Badge 
                        variant={getPriorityVariant(task.priority)}
                        className="w-fit gap-1 capitalize mt-1 sm:mt-0"
                      >
                        {getPriorityIcon(task.priority)}
                        {task.priority}
                      </Badge>
                    )}
                  </div>

                  {/* Notes */}
                  {task.note && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {task.note}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    {task.category && (
                      <div className="flex items-center space-x-1">
                        <Folder className="h-3 w-3" />
                        <span>{task.category}</span>
                      </div>
                    )}
                    
                    {/* Due Date */}
                    {task.due_date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(task.due_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-1">

                {/* Update Dialog */}
                <UpdateDialog 
                task={task}
                onUpdate={onUpdate}
                onRefresh={onRefresh}/>

                {/* Delete Dialog */}
                <DeleteConfirm 
                  task={task}
                  onDelete={onDelete}
                  onRefresh={onRefresh}
                />

              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}