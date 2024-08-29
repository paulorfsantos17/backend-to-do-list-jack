import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common'

import { CompletedTaskUseCase } from '@/domain/manager-tasks/application/use-cases/completed-task'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/tasks/:id/completed')
export class CompletedTaskController {
  constructor(private completedQuestion: CompletedTaskUseCase) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  async handle(@CurrentUser() user: UserPayload, @Param('id') taskId: string) {
    const userId = user.sub

    try {
      await this.completedQuestion.execute({
        authorId: userId,
        taskId,
      })
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error.message)
    }
  }
}
