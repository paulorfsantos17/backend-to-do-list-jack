import { Module } from '@nestjs/common'

import { UsersRepository } from '@/domain/auth/application/repositories/users-repository'
import { TasksListRepository } from '@/domain/manager-tasks/application/repositories/tasks-list-repositories'

import { PrismaService } from './prisma/prisma.service'
import { PrismaTasksListRepository } from './prisma/repositories/prisma-task-list-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: TasksListRepository, useClass: PrismaTasksListRepository },
  ],
  exports: [PrismaService, UsersRepository, TasksListRepository],
})
export class DatabaseModule {}
