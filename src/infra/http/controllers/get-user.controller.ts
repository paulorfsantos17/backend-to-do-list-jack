import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'

import { GetUserUseCase } from '@/domain/auth/application/use-cases/get-user'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { UserPresenter } from '../presenters/user-presenter'

@Controller('/users')
export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub

    try {
      const { user } = await this.getUserUseCase.execute({
        id: userId,
      })

      return {
        user: UserPresenter.toHTTP(user),
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.message)
    }
  }
}
