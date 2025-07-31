"use client";

import { useEffect, useState } from "react";
import { TaskCreateModal } from "@/components/task-create-modal";
import { TaskList } from "@/components/task-list";
import { TaskDetailModal } from "@/components/task-detail-modal";
import { useToast } from "@/components/ui/use-toast";
import { getTasks, createTask } from "@/lib/api";

export interface Task {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast({
          title: "Error",
          description: "Failed to load tasks.",
          variant: "destructive",
          id: crypto.randomUUID(),
        });
      }
    };

    fetchTasks();
  }, [toast]);

  const addTask = async (name: string, description: string) => {
    try {
      const newTask = await createTask({ name, description });
      setTasks((prevTasks) => [...prevTasks, newTask]);
      toast({
        title: "Tarea Creada",
        description: "La tarea ha sido creada exitosamente.",
        variant: "default",
        id: crypto.randomUUID(),
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description: "Failed to create task.",
        variant: "destructive",
        id: crypto.randomUUID(),
      });
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast({
      title: "Tarea Eliminada",
      description: "La tarea ha sido eliminada exitosamente.",
      variant: "default",
      id: crypto.randomUUID(),
    });
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-900 dark:text-gray-50 tracking-tight">
          Mi Tablero de Tareas
        </h1>

        {/* El botón de añadir tarea se ha movido a TaskList como una tarjeta */}
        <TaskList
          tasks={tasks}
          onDeleteTask={deleteTask}
          onSelectTask={handleTaskClick}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />

        <TaskCreateModal
          isOpen={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onAddTask={addTask}
        />

        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            isOpen={isDetailModalOpen}
            onOpenChange={setIsDetailModalOpen}
          />
        )}
      </div>
    </div>
  );
}
