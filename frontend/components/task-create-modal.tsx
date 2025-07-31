"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface TaskCreateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (name: string, description: string) => void;
}

export function TaskCreateModal({
  isOpen,
  onOpenChange,
  onAddTask,
}: TaskCreateModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      toast({
        title: "Error de Validación",
        description: "El nombre de la tarea no puede estar vacío.",
        variant: "destructive",
        id: crypto.randomUUID(),
      });
      return;
    }

    onAddTask(name, description);
    setName("");
    setDescription("");
    onOpenChange(false); // Close the modal
    toast({
      title: "¡Tarea Añadida!",
      description: "Tu nueva tarea ha sido añadida exitosamente.",
      id: crypto.randomUUID(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Crear Nueva Tarea
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Rellena los detalles para tu nueva tarea. Haz clic en guardar cuando
            hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="task-name"
              className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Nombre de la Tarea
            </Label>
            <Input
              id="task-name"
              placeholder="Ej: Terminar informe del proyecto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-3 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="task-description"
              className="text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Descripción (Opcional)
            </Label>
            <Textarea
              id="task-description"
              placeholder="Ej: Incluir análisis de datos y conclusiones."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <Button
            type="submit"
            className="w-full px-6 py-3 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            Añadir Tarea
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
