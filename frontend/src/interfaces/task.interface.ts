export interface Task {
  id?: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  parentId?: string;
  isAiGenerated?: boolean;
}
