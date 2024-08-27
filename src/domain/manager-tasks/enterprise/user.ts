import { Entity } from 'src/core/entities/entity'
import type { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface UserProps {
  name: string
  email: string
  password: string
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.name
  }

  get email(): string {
    return this.email
  }

  get password(): string {
    return this.password
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User({ ...props }, id)
    return user
  }
}
