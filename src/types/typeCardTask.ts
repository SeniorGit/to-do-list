import { Task,CreateTaskRequest } from "./typeTask";

export interface CardTaskProps {
  tasks: Task[];
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, updates: Partial<Task>) => Promise<void>; 
  onRefresh: () => Promise<void>;
}

export interface CardTaskDeleteAction {
  task: Task;
  onDelete: (id: number) => Promise<void>;
  onRefresh: () => Promise<void>; 
}

export interface CardTaskUpdateAction {
  task: Task;
  onRefresh: () => Promise<void>;
  onUpdate: (id: number, updates: Partial<Task>) => Promise<void>; 
}

export interface FormTaskProps {
  onTaskAdded?: () => void;
  onTaskUpdated?: () => void;
  task?: Task;
  onAddTask?: (taskData: Omit<CreateTaskRequest, 'id'>) => Promise<void>;
  onUpdateTask?: (id: number, taskData: Partial<Task>) => Promise<void>;
}