import { Entity } from 'src/core/entities/entity'
import type { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface TaskProps {
  title: string
  description: string
  completionDate?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Task extends Entity<TaskProps> {
  static create(props: TaskProps, id?: UniqueEntityId) {
    const task = new Task({ ...props }, id)
    return task
  }
}
