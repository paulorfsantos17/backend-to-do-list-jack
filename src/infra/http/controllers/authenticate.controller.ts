import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

import { AuthenticatedUserUseCase } from '@/domain/auth/application/use-cases/authenticate-user'
import { WrongCredentialsError } from '@/domain/auth/application/use-cases/erros/wrong-credentials-error'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private authenticateStudentUseCase: AuthenticatedUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    try {
      const { accessToken } = await this.authenticateStudentUseCase.execute({
        email,
        password,
      })

      return {
        access_token: accessToken,
      }
    } catch (error) {
      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
