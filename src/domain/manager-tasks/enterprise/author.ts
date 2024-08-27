import { Entity } from 'src/core/entities/entity'
import type { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface AuthorProps {
  name: string
  email: string
  password: string
}

export class Author extends Entity<AuthorProps> {
  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  static create(props: AuthorProps, id?: UniqueEntityId) {
    const user = new Author({ ...props }, id)
    return user
  }
}
