import { Injectable } from '@nestjs/common'

import { TasksListRepository } from '@/domain/manager-tasks/application/repositories/tasks-list-repositories'
import { TaskList } from '@/domain/manager-tasks/enterprise/task-list'

import { PrismaTaskListMapper } from '../mappers/prisma-task-list-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTasksListRepository implements TasksListRepository {
  constructor(private prisma: PrismaService) {}

  async findTaskListByAuthor(authorId: string): Promise<TaskList | null> {
    const data = await this.prisma.taskList.findFirst({
      where: { userId: authorId },
      include: { tasks: true },
    })

    if (!data) {
      return null
    }

    return PrismaTaskListMapper.toDomain(data)
  }

  async save(taskList: TaskList): Promise<void> {
    const data = PrismaTaskListMapper.toPrisma(taskList)
    await this.prisma.taskList.upsert({
      create: data,
      update: data,
      where: { id: taskList.id.toString() },
    })
  }

  async update(taskList: TaskList): Promise<void> {
    const data = PrismaTaskListMapper.toPrisma(taskList)
    await this.prisma.taskList.upsert({
      create: data,
      update: data,
      where: { id: taskList.id.toString() },
    })
  }
}
