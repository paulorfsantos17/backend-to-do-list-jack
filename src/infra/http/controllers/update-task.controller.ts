import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

import { UpdateTaskUseCase } from '@/domain/manager-tasks/application/use-cases/update-task'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const updateTaskBodySchema = z.object({
  title: z.string(),
  description: z.string(),
})

type UpdateTaskBodySchema = z.infer<typeof updateTaskBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateTaskBodySchema)

@Controller('/tasks/:id')
export class UpdateTaskController {
  constructor(private updateQuestion: UpdateTaskUseCase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') taskId: string,
    @Body(bodyValidationPipe) body: UpdateTaskBodySchema,
  ) {
    const { title, description } = body
    const userId = user.sub

    try {
      await this.updateQuestion.execute({
        authorId: userId,
        description,
        title,
        taskId,
      })
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error.message)
    }
  }
}
