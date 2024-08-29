import { Module } from '@nestjs/common'

import { AuthenticatedUserUseCase } from '@/domain/auth/application/use-cases/authenticate-user'
import { RegisterUserUseCase } from '@/domain/auth/application/use-cases/register-user'
import { CreateTaskUseCase } from '@/domain/manager-tasks/application/use-cases/create-task'
import { DeleteTaskUseCase } from '@/domain/manager-tasks/application/use-cases/delete-task'
import { FetchAllTasksUseCase } from '@/domain/manager-tasks/application/use-cases/fetch-all-tasks'
import { UpdateTaskUseCase } from '@/domain/manager-tasks/application/use-cases/update-task'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateTaskController } from './controllers/create-tasks.controller'
import { DeleteTaskController } from './controllers/delete-task.controller'
import { FetchAllTasksController } from './controllers/fetch-all-tasks.controller'
import { RegisterUserController } from './controllers/register-user.controller'
import { UpdateTaskController } from './controllers/update-task.controller'

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [
    RegisterUserController,
    AuthenticateController,
    CreateTaskController,
    FetchAllTasksController,
    UpdateTaskController,
    DeleteTaskController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticatedUserUseCase,
    CreateTaskUseCase,
    FetchAllTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
  ],
})
export class HttpModule {}
