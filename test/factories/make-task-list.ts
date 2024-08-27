import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  TaskList,
  type TaskListProps,
} from '@/domain/manager-tasks/enterprise/task-list'

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
