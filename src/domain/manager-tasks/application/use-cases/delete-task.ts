import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { TasksListRepository } from '../repositories/tasks-list-repositories'

interface DeleteTaskUseCaseProps {
  authorId: string
  taskId: string
}

export class DeleteTaskUseCase {
  constructor(private tasksListRepository: TasksListRepository) {}

  async execute({ authorId, taskId }: DeleteTaskUseCaseProps): Promise<void> {
    const taskList =
      await this.tasksListRepository.findTaskListByAuthor(authorId)

    if (!taskList) {
      throw new ResourceNotFoundError()
    }

    const task = taskList.tasks.find((task) => task.id.toString() === taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    taskList.removeTask(taskId)
    await this.tasksListRepository.update(taskList)
  }
}
