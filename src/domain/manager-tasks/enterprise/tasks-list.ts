import { AggregateRoot } from 'src/core/entities/aggregate-root'
import type { UniqueEntityId } from 'src/core/entities/unique-entity-id'

import type { Task } from '../../auth/enterprise/task'

interface TasksListProps {
  author_id: UniqueEntityId
  tasks: Task[]
  createdAt: Date
  updatedAt?: Date | null
}

export class TasksList extends AggregateRoot<TasksListProps> {
  static create(props: TasksListProps, id?: UniqueEntityId) {
    const task = new TasksList({ ...props }, id)
    return task
  }
}
