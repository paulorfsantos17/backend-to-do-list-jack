import { Module } from '@nestjs/common'

import { AuthenticatedUserUseCase } from '@/domain/auth/application/use-cases/authenticate-user'
import { RegisterUserUseCase } from '@/domain/auth/application/use-cases/register-user'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { RegisterUserController } from './controllers/register-user.controller'

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [RegisterUserController, AuthenticateController],
  providers: [RegisterUserUseCase, AuthenticatedUserUseCase],
})
export class HttpModule {}
