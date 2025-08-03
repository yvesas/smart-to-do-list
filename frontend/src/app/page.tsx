"use client";

import { useEffect } from "react";
import { AIPromptForm } from "@/components/tasks/ai-prompt-form";
import { CreateTaskForm } from "@/components/tasks/create-task-form";
import { TaskList } from "@/components/tasks/task-list";
import { useTaskStore } from "@/store/task.store";

export default function Home() {
  const { fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="container mx-auto p-4 grid gap-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">Generate Tasks with AI</h2>
        <AIPromptForm />
      </div>

      <div className="grid gap-4">
        <h2 className="text-lg font-semibold">Or Add a Task Manually</h2>
        <CreateTaskForm />
        <TaskList />
      </div>
    </div>
  );
}