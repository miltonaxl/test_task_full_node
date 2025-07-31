"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import type { Task } from "@/app/page";
import { PlusIcon, Trash2Icon } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onSelectTask: (task: Task) => void;
  onOpenCreateModal: () => void;
}

export function TaskList({
  tasks,
  onDeleteTask,
  onSelectTask,
  onOpenCreateModal,
}: TaskListProps) {
  return (
    <Card className="w-full shadow-none rounded-none border-none bg-transparent dark:bg-transparent">
      <CardHeader className="bg-transparent p-0 pb-6 border-none">
        <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Tus Tareas Actuales
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">
          Organiza y sigue tus actividades diarias.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px] w-full rounded-lg p-4 bg-white dark:bg-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Tarjeta para añadir nueva tarea */}
            <Card
              className="p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ease-in-out group aspect-square flex flex-col items-center justify-center text-center cursor-pointer"
              onClick={onOpenCreateModal}
            >
              <PlusIcon className="h-16 w-16 mb-2" />
              <p className="text-lg font-semibold">Añadir Tarea</p>
            </Card>

            {tasks.length === 0 && (
              <div className="col-span-full py-16 text-center text-muted-foreground">
                <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ¡Aún no hay tareas, excepto la de añadir!
                </p>
                <p className="text-md text-gray-500 dark:text-gray-400">
                  Haz clic en la tarjeta "+" para empezar.
                </p>
              </div>
            )}

            {tasks.map((task) => (
              <Card
                key={task.id}
                className="p-4 rounded-lg border-none shadow-none bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out group aspect-square flex flex-col justify-between"
              >
                <button
                  onClick={() => onSelectTask(task)}
                  className="flex-grow flex flex-col justify-between w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-md"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-1 line-clamp-2">
                      {task.name}
                    </h3>
                    {task.description && (
                      <p className="text-base text-gray-700 dark:text-gray-300 mb-2 leading-relaxed line-clamp-3">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
                    Creada:{" "}
                    {task.createdAt
                      ? new Date(task.createdAt).toLocaleString()
                      : "Fecha no disponible"}
                  </p>
                </button>

                <div className="flex justify-end mt-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2Icon className="h-5 w-5" />
                        <span className="sr-only">Eliminar Tarea</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                          ¿Estás absolutamente seguro?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                          Esta acción no se puede deshacer. Esto eliminará
                          permanentemente tu tarea.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDeleteTask(task.id)}
                          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
