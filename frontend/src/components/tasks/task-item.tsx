"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/interfaces/task.interface";
import { useTaskStore } from "@/store/task.store";
import { Trash2 } from "lucide-react";

export function TaskItem({ task }: { task: Task }) {
  const { toggleTask, deleteTask } = useTaskStore();

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Checkbox
        id={task.id}
        checked={task.isCompleted}
        onCheckedChange={() => toggleTask(task.id)}
      />
      <label
        htmlFor={task.id}
        className={`flex-1 ${
          task.isCompleted ? "line-through text-muted-foreground" : ""
        }`}
      >
        {task.title}
      </label>
      <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
