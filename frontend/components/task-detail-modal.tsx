"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Task } from "@/app/page"

interface TaskDetailModalProps {
  task: Task | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskDetailModal({ task, isOpen, onOpenChange }: TaskDetailModalProps) {
  if (!task) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">{task.name}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 text-lg">
            Detalles de la Tarea
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-1">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Descripción:</p>
            <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
              {task.description || "Sin descripción."}
            </p>
          </div>
          <div className="grid gap-1">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">ID de Tarea:</p>
            <p className="text-base text-gray-800 dark:text-gray-200 font-mono break-all">{task.id}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Fecha de Creación:</p>
            <p className="text-base text-gray-800 dark:text-gray-200">{new Date(task.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
