import { Task, CreateTaskRequest } from "@/types/typeTask";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useFetchTask = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null); 
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const getToken = (): string | null => {
        return localStorage.getItem('token');
    };

    useEffect(() => {
        fetchTasks();
    }, []);
  
    // Req Get All - FIXED
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

            const response = await fetch(`${API_URL}/tasks`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }); 

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    setError('Authentication failed - please login again');
                    toast.error("Session expired. Please login again.")
                    return;
                }
                throw new Error(`Failed to fetch tasks: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success && Array.isArray(result.data)) {
                setTasks(result.data);
            } else if (Array.isArray(result)) {
                setTasks(result);
            } else {
                console.warn('Unexpected response format:', result);
                setTasks([]);
            }

        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            toast.error("Failed to load tasks. Please try again.");
            setTasks([]); 
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
                return null;
            }

            const response = await fetch(`${API_URL}/tasks`, {
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
                    setError('Authentication failed');
                    toast.error("Session expired. Please login again.");
                    return null;
                }
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Failed to add task');
            }
            
            const result = await response.json();
            
            await fetchTasks();
            toast.success("Task added successfully!");
            
            return result.data || result;
            
        } catch (err) {
            console.error("Error adding task:", err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to add task';
            setError(errorMessage);
            toast.error(errorMessage);
            return null;
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
                return null;
            }

            const response = await fetch(`${API_URL}/tasks/${id}`, {
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
                    setError('Authentication failed');
                    toast.error("Session expired. Please login again.");
                    return null;
                }
                throw new Error('Failed to update task');
            }
            const result = await response.json();
            
            await fetchTasks();
            toast.success("Task updated successfully!");
            
            return result.data || result;
            
        } catch (err) {
            console.error("Error updating task:", err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
            setError(errorMessage);
            toast.error(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Delete Task 
    const deleteTask = async (id: number): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken();
            if (!token) {
                setError('No authentication token found');
                setLoading(false);
                return;
            }

            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    setError('Authentication failed');
                    toast.error("Session expired. Please login again.");
                    return;
                }
                throw new Error('Failed to delete task');
            }
            
            const result = await response.json();
            
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