import type { Task } from '@/domain/manager-tasks/enterprise/task'

export class TaskPresenter {
  static toHTTP(task: Task) {
    return {
      id: task.id.toString(),
      title: task.title,
      description: task.description,
      completionDate: task.completionDate,
      createdAt: task.createdAt,
    }
  }
}
