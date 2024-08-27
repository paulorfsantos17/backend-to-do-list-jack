import { UsersRepository } from '@/domain/auth/application/repositories/users-repository'
import { User } from '@/domain/auth/enterprise/user'

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = []

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((item) => item.email === email)
  }
}
