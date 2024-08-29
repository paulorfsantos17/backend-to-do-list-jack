import { Injectable } from '@nestjs/common'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Task } from '../../enterprise/task'
import { TaskList } from '../../enterprise/task-list'
import { TasksListRepository } from '../repositories/tasks-list-repositories'

interface CreateTaskUseCaseProps {
  authorId: string
  title: string
  description: string
}

@Injectable()
export class CreateTaskUseCase {
  constructor(private tasksListRepository: TasksListRepository) {}

  async execute({
    authorId,
    description,
    title,
  }: CreateTaskUseCaseProps): Promise<void> {
    let taskList = await this.tasksListRepository.findTaskListByAuthor(authorId)

    if (!taskList) {
      taskList = TaskList.create({
        authorId: new UniqueEntityId(authorId),
        tasks: [],
        createdAt: new Date(),
      })
      await this.tasksListRepository.create(taskList)
    }

    const task = Task.create({
      title,
      description,
      completionDate: null,
      createdAt: new Date(),
      updatedAt: null,
    })

    taskList.addTask(task)

    await this.tasksListRepository.update(taskList)
  }
}
