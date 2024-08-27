import { AggregateRoot } from 'src/core/entities/aggregate-root'
import type { UniqueEntityId } from 'src/core/entities/unique-entity-id'

import type { Task } from './task'

export interface TaskListProps {
  authorId: UniqueEntityId
  tasks: Task[]
  createdAt: Date
  updatedAt?: Date | null
}

export class TaskList extends AggregateRoot<TaskListProps> {
  get authorId(): UniqueEntityId {
    return this.props.authorId
  }

  get tasks(): Task[] {
    return this.props.tasks
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt
  }

  addTask(task: Task): void {
    this.props.tasks.push(task)
  }

  updateTask(taskUpdate: Task): void {
    const indexOfTask = this.tasks.findIndex((task) =>
      task.id.equals(taskUpdate.id),
    )

    this.tasks[indexOfTask] = taskUpdate
  }

  static create(props: TaskListProps, id?: UniqueEntityId) {
    const task = new TaskList({ ...props }, id)
    return task
  }
}
