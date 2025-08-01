export class TaskEntity {
  id: string;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string | null;
  isAiGenerated: boolean;
}
