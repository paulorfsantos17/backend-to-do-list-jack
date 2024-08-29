import {
  Prisma,
  Task as PrismaTask,
  TaskList as PrismaTaskList,
} from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Task } from '@/domain/manager-tasks/enterprise/task'
import { TaskList } from '@/domain/manager-tasks/enterprise/task-list'
interface TaskListIncludeTask extends PrismaTaskList {
  tasks: PrismaTask[]
}

export class PrismaTaskListMapper {
  static toDomain(raw: TaskListIncludeTask): TaskList {
    return TaskList.create(
      {
        authorId: new UniqueEntityId(raw.userId),
        createdAt: new Date(raw.createdAt),
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : null,
        tasks: raw.tasks.map((task) =>
          Task.create(task, new UniqueEntityId(task.id)),
        ),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrismaCreate(
    taskList: TaskList,
  ): Prisma.TaskListUncheckedCreateInput {
    return {
      id: taskList.id.toString(),
      userId: taskList.authorId.toString(),
      createdAt: taskList.createdAt,
      updatedAt: taskList.updatedAt,
    }
  }

  static toPrismaUpdate(taskList: TaskList): Prisma.TaskListUpdateInput {
    return {
      id: taskList.id.toString(),
      createdAt: taskList.createdAt,
      updatedAt: taskList.updatedAt,
      tasks: {
        upsert: taskList.tasks.map((task) => ({
          where: { id: task.id.toString() },
          update: {
            title: task.title,
            description: task.description,
            completionDate: task.completionDate,
            updatedAt: task.updatedAt || new Date(),
          },
          create: {
            id: task.id.toString(),
            title: task.title,
            description: task.description,
            completionDate: task.completionDate,
            createdAt: task.createdAt || new Date(),
            updatedAt: task.updatedAt || null,
          },
        })),
      },
    }
  }
}
