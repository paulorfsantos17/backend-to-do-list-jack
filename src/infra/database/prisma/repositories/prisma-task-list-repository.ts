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

  async create(taskList: TaskList): Promise<void> {
    const data = PrismaTaskListMapper.toPrismaCreate(taskList)

    await this.prisma.taskList.create({
      data,
    })
  }

  async update(taskList: TaskList): Promise<void> {
    const data = PrismaTaskListMapper.toPrismaUpdate(taskList)

    await this.prisma.taskList.update({
      where: { id: taskList.id.toString() },
      data,
    })
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id: taskId },
    })
  }
}
