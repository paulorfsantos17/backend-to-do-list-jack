import { Module } from '@nestjs/common'

import { RegisterUserUseCase } from '@/domain/auth/application/use-cases/register-user'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { RegisterUserController } from './controllers/register-user.controller'

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [RegisterUserController],
  providers: [RegisterUserUseCase],
})
export class HttpModule {}
