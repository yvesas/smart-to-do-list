"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { GenerateTasksSchema } from "@/schemas/task.schema";
import { useTaskStore } from "@/store/task.store";

export function AIPromptForm() {
  const { generateAndAddTasks, isLoading } = useTaskStore();
  const form = useForm<z.infer<typeof GenerateTasksSchema>>({
    resolver: zodResolver(GenerateTasksSchema),
    defaultValues: {
      prompt: "",
    },
  });

  function onSubmit(values: z.infer<typeof GenerateTasksSchema>) {
    generateAndAddTasks({ prompt: values.prompt });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Describe your goal and let AI break it down for you..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate with AI"}
        </Button>
      </form>
    </Form>
  );
}
