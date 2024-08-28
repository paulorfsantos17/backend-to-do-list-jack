import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/auth/application/repositories/users-repository'
import { User } from '@/domain/auth/enterprise/user'

import { PrismaStudentMapper } from '../mappers/prisma-user-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create(user: User): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(user)
    await this.prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return PrismaStudentMapper.toDomain(user)
  }
}
