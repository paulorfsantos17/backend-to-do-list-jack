import { Entity } from 'src/core/entities/entity'
import type { UniqueEntityId } from 'src/core/entities/unique-entity-id'

export interface TaskProps {
  title: string
  description: string
  completionDate?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Task extends Entity<TaskProps> {
  get title(): string {
    return this.props.title
  }

  get description(): string {
    return this.props.description
  }

  get completionDate(): Date | null {
    return this.props.completionDate
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt
  }

  set title(title: string) {
    this.props.title = title
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: TaskProps, id?: UniqueEntityId) {
    const task = new Task({ ...props }, id)
    return task
  }
}
