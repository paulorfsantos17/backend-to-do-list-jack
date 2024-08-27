import type { User } from '@/domain/auth/enterprise/user'

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>
  abstract findByEmail(email: string): Promise<User | null>
}
