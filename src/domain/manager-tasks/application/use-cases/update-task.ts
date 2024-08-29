import { Injectable } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { TasksListRepository } from '../repositories/tasks-list-repositories'

interface UpdateTaskUseCaseProps {
  authorId: string
  taskId: string
  title: string
  description: string
}

@Injectable()
export class UpdateTaskUseCase {
  constructor(private tasksListRepository: TasksListRepository) {}

  async execute({
    authorId,
    taskId,
    description,
    title,
  }: UpdateTaskUseCaseProps): Promise<void> {
    const taskList =
      await this.tasksListRepository.findTaskListByAuthor(authorId)

    if (!taskList) {
      throw new ResourceNotFoundError()
    }

    const task = taskList.tasks.find((task) => task.id.toString() === taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    task.title = title
    task.description = description

    taskList.updateTask(task)

    await this.tasksListRepository.update(taskList)
  }
}
