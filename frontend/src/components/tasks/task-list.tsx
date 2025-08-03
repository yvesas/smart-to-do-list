"use client";

import { useTaskStore } from "@/store/task.store";
import { TaskItem } from "./task-item";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskList() {
  const { tasks, isLoading } = useTaskStore();

  if (isLoading && tasks.length === 0) {
    return (
      <div className="grid gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}