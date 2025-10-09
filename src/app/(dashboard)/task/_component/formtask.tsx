import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { FormTaskProps } from "@/types/typeCardTask";
import { CreateTaskRequest } from "@/types/typeTask";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function FormTask({ 
    onTaskAdded, 
    onTaskUpdated, 
    task, 
    onAddTask, 
    onUpdateTask 
}: FormTaskProps) {

    // form temporary for changing data
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        priority: "medium",
        note: "", 
        due_date: "",
        reminder: ""
    })

    // loading state
    const [isLoading, setIsLoading] = useState(false);
    
    //to show prev data to form
    useEffect(() => {
      if (task) {
          const convertISODateToHTMLDate = (isoString: string | undefined): string => {
            if (!isoString) return "";
            try {
                const date = new Date(isoString);
                if (isNaN(date.getTime())) return "";
                return date.toISOString().split('T')[0];
            } catch {
                return "";
            }
          };

          const convertISODateToHTMLDateTime = (isoString: string | undefined): string => {
            if (!isoString) return "";
            try {
                const date = new Date(isoString);
                if (isNaN(date.getTime())) return "";
                return date.toISOString().slice(0, 16);
            } catch {
                return "";
            }
          };

          setFormData({
            title: task.title || "",
            category: task.category || "",
            priority: task.priority || "medium", 
            note: task.note || "",
            due_date: convertISODateToHTMLDate(task.due_date),     
            reminder: convertISODateToHTMLDateTime(task.reminder)  
          });
      } else {
          setFormData({
            title: "",
            category: "",
            priority: "medium",
            note: "", 
            due_date: "",
            reminder: ""
          });
      }
    }, [task]);
    
    // handle change input on form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // handle change selection
    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // handle submit to DB
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            if (task?.id && onUpdateTask) {   
                await onUpdateTask(task.id, formData);
                if (onTaskUpdated) onTaskUpdated();
            } else if (onAddTask) {
                const createData: CreateTaskRequest = {
                    ...formData,
                    is_completed: false 
                };
                
                await onAddTask(createData);
                if (onTaskAdded) onTaskAdded();
            }
            
            // Reset form only if not in edit mode
            if (!task?.id) {
                setFormData({
                    title: "", 
                    category: "", 
                    priority: "medium", 
                    note: "", 
                    due_date: "", 
                    reminder: ""
                });
            }
            
        } catch (error) {
            console.error("Failed to save task:", error);
            toast.error("Failed to save task! Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        // form TASK
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input 
                        id="title" 
                        name="title" 
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="What needs to be done?"
                        className="w-full"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="note">Description</Label>
                    <Textarea
                        id="note" 
                        name="note" 
                        value={formData.note}
                        onChange={handleChange}
                        className="min-h-[100px] resize-none"
                        placeholder="Add details about your task..."
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input 
                            id="category" 
                            name="category" 
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., Work, Personal"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select 
                            value={formData.priority} 
                            onValueChange={(value) => handleSelectChange("priority", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="due_date">Due Date</Label>
                        <Input 
                            type="date"
                            id="due_date" 
                            name="due_date" 
                            value={formData.due_date}
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="reminder">Reminder</Label>
                        <Input 
                            type="datetime-local"
                            id="reminder" 
                            name="reminder" 
                            value={formData.reminder}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            
            {/* Button submit or update task */}
            <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full"
            >
                {isLoading ? (
                    <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Saving...</span>
                    </div>
                ) : (
                    task?.id ? "Update Task" : "Create Task"
                )}
            </Button>
        </form>
    )
}