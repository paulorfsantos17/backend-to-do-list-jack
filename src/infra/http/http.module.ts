import { Module } from '@nestjs/common'

import { AuthenticatedUserUseCase } from '@/domain/auth/application/use-cases/authenticate-user'
import { RegisterUserUseCase } from '@/domain/auth/application/use-cases/register-user'
import { CreateTaskUseCase } from '@/domain/manager-tasks/application/use-cases/create-task'
import { FetchAllTasksUseCase } from '@/domain/manager-tasks/application/use-cases/fetch-all-tasks'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateTaskController } from './controllers/create-tasks.controller'
import { FetchAllTasksController } from './controllers/fetch-all-tasks.controller'
import { RegisterUserController } from './controllers/register-user.controller'

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [
    RegisterUserController,
    AuthenticateController,
    CreateTaskController,
    FetchAllTasksController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticatedUserUseCase,
    CreateTaskUseCase,
    FetchAllTasksUseCase,
  ],
})
export class HttpModule {}
