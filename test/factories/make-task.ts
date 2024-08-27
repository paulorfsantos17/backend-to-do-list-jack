import { faker } from '@faker-js/faker'

import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Task, type TaskProps } from '@/domain/manager-tasks/enterprise/task'

export function makeTask(
  override: Partial<TaskProps> = {},
  id?: UniqueEntityId,
) {
  const task = Task.create(
    {
      title: faker.lorem.sentence(3),
      description: faker.lorem.paragraph(),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return task
}
