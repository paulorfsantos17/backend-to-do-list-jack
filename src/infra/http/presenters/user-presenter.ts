import type { User } from '@/domain/auth/enterprise/user'

export class UserPresenter {
  static toHTTP(task: User) {
    return {
      id: task.id.toString(),
      name: task.name,
      email: task.email,
    }
  }
}
