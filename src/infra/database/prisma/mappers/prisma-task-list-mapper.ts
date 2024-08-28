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
        tasks: raw.tasks.map((task) => Task.create(task)),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(taskList: TaskList): Prisma.TaskListUncheckedCreateInput {
    return {
      userId: taskList.authorId.toString(),
      createdAt: taskList.createdAt,
      updatedAt: taskList.updatedAt,
      tasks: {
        createMany: {
          data: taskList.tasks.map((task) => ({
            title: task.title,
            description: task.description,
            completionDate: task.completionDate,
          })),
        },
      },
    }
  }
}
