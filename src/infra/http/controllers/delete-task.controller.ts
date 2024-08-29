import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common'

import { DeleteTaskUseCase } from '@/domain/manager-tasks/application/use-cases/delete-task'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/tasks/:id')
export class DeleteTaskController {
  constructor(private deleteQuestion: DeleteTaskUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  async handle(@CurrentUser() user: UserPayload, @Param('id') taskId: string) {
    const userId = user.sub

    try {
      await this.deleteQuestion.execute({
        authorId: userId,
        taskId,
      })
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error.message)
    }
  }
}
