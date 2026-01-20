import type { TaskPublicDTO } from '@packages/tasks'
import type { Task } from '@/entities/task.entity'

export class TasksMapper {
  toPublicDTO(task: Task): TaskPublicDTO {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      createdAt: task.createdAt.toISOString(),
      deadline: task.deadline.toISOString(),
    }
  }
}
