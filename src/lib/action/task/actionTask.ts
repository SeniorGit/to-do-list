import { Task, CreateTaskRequest } from "@/types/typeTask";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useFetchTask = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null); 
  
    const getToken = (): string | null => {
        return localStorage.getItem('token');
    };

    useEffect(() => {
        fetchTasks();
    }, []);
  
    // Req Get All
    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken();
            if(!token){
                setError('No authentication token found');
                setLoading(false);
                return;
            }

            const response = await fetch("http://localhost:3000/tasks", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }); 

            // Handle response status lebih sederhana
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    setError('Authentication failed - please login again');
                    toast.error("Session expired. Please login again.")
                    return;
                }
                throw new Error(`Failed to fetch tasks: ${response.status}`);
            }

            const data: Task[] = await response.json();
            setTasks(data);

        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            toast.error("Failed to load tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Add New Task
    const addTask = async (taskData: CreateTaskRequest) => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken();
            if (!token) {
                setError('No authentication token found');
                setLoading(false);
                return;
            }

            const response = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(taskData),
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    return;
                }
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Failed to add task');
            }
            
            await fetchTasks();
            toast.success("Task added successfully!")
            return await response.json();
            
        } catch (err) {
            console.error("Error adding task:", err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to add task'
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
  
    // Update Task
    const updateTask = async (id: number, updates: Partial<Task>) => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken();
            if (!token) {
                setError('No authentication token found');
                setLoading(false);
                return;
            }

            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updates),
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    return;
                }
                throw new Error('Failed to update task');
            }
            
            await fetchTasks();
            toast.success("Task updated successfully!")
            return response.json();
            
        } catch (err) {
            console.error("Error updating task:", err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to update task'
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Delete Task
    const deleteTask = async (id: number) => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken();
            if (!token) {
                setError('No authentication token found');
                setLoading(false);
                return;
            }

            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    return;
                }
                throw new Error('Failed to delete task');
            }
            
            await fetchTasks();
            toast.success("Task deleted successfully!");

        } catch (err) {
            console.error("Error deleting task:", err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        tasks,
        loading, 
        error,   
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
    };
};