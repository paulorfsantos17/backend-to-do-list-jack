import { Prisma, User as PrismaUser } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/auth/enterprise/user'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      password: user.password,
    }
  }
}
