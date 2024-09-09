import { Module } from '@nestjs/common'

import { AuthenticatedUserUseCase } from '@/domain/auth/application/use-cases/authenticate-user'
import { GetUserUseCase } from '@/domain/auth/application/use-cases/get-user'
import { RegisterUserUseCase } from '@/domain/auth/application/use-cases/register-user'
import { CompletedTaskUseCase } from '@/domain/manager-tasks/application/use-cases/completed-task'
import { CreateTaskUseCase } from '@/domain/manager-tasks/application/use-cases/create-task'
import { DeleteTaskUseCase } from '@/domain/manager-tasks/application/use-cases/delete-task'
import { FetchAllTasksUseCase } from '@/domain/manager-tasks/application/use-cases/fetch-all-tasks'
import { UpdateTaskUseCase } from '@/domain/manager-tasks/application/use-cases/update-task'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CompletedTaskController } from './controllers/completed-task.controller'
import { CreateTaskController } from './controllers/create-tasks.controller'
import { DeleteTaskController } from './controllers/delete-task.controller'
import { FetchAllTasksController } from './controllers/fetch-all-tasks.controller'
import { GetUserController } from './controllers/get-user.controller'
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
    CompletedTaskController,
    GetUserController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticatedUserUseCase,
    CreateTaskUseCase,
    FetchAllTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    CompletedTaskUseCase,
    GetUserUseCase,
  ],
})
export class HttpModule {}
