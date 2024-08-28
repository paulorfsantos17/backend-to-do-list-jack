import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/domain/auth/application/use-cases/erros/user-already-exists-error'
import { RegisterUserUseCase } from '@/domain/auth/application/use-cases/register-user'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const registerUserBodySchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(20),
})

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>

@Controller('/register')
export class RegisterUserController {
  constructor(private registerUser: RegisterUserUseCase) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(registerUserBodySchema))
  async handle(@Body() body: RegisterUserBodySchema) {
    const { name, email, password } = body

    try {
      await this.registerUser.execute({ name, email, password })
    } catch (error) {
      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
