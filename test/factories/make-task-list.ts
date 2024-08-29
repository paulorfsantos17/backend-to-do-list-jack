import { Injectable } from '@nestjs/common'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  TaskList,
  TaskListProps,
} from '@/domain/manager-tasks/enterprise/task-list'
import { PrismaTaskListMapper } from '@/infra/database/prisma/mappers/prisma-task-list-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeTaskList(
  override: Partial<TaskListProps> = {},
  id?: UniqueEntityId,
) {
  const task = TaskList.create(
    {
      authorId: new UniqueEntityId(),
      tasks: [],
      createdAt: new Date(),
      updatedAt: null,
      ...override,
    },
    id,
  )

  return task
}

@Injectable()
export class TaskListFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaTaskList(
    data: Partial<TaskListProps> = {},
  ): Promise<TaskList> {
    const taskList = makeTaskList(data)
    const dataToPrismaCreate = PrismaTaskListMapper.toPrismaCreate(taskList)

    await this.prisma.taskList.create({
      data: dataToPrismaCreate,
    })

    const dataToPrismaUpdate = PrismaTaskListMapper.toPrismaUpdate(taskList)

    await this.prisma.taskList.update({
      where: { id: taskList.id.toString() },
      data: dataToPrismaUpdate,
    })

    return taskList
  }
}
