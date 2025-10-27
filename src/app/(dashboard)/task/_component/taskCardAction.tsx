import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2, Edit } from "lucide-react"
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormTask } from "./formtask";
import { CardTaskDeleteAction, CardTaskUpdateAction } from "@/types/typeCardTask";

// Dialog Alert Delete Task
export function DeleteConfirm({ task, onDelete, onRefresh }: CardTaskDeleteAction) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setDeletingId(task.id);
    try {
      await onDelete(task.id);
      await onRefresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete 
            the task {task.title} from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deletingId !== null}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={deletingId !== null}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
          >
            {deletingId ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Update Task 
export function UpdateDialog({task, onRefresh, onUpdate}: CardTaskUpdateAction){
  const [isOpen, setIsOpen] = useState(false);

  // auto close dialog
  const handleUpdateSuccess = async () => {
    await onRefresh();
    setIsOpen(false); 
  };
  
  return(
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
      <Button 
        variant="ghost" 
        size="icon"
        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Edit className="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>
          Make changes to your task here.
        </DialogDescription>
      </DialogHeader>
      <FormTask 
        task={task}  
        onTaskUpdated={handleUpdateSuccess}
        onUpdateTask={onUpdate} 
      />
    </DialogContent>
  </Dialog>
  )
}

