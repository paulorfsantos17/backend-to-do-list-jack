import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { CreateTaskUseCase } from '@/domain/manager-tasks/application/use-cases/create-task'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { TaskPresenter } from '../presenters/task-presenter'

const createTaskBodySchema = z.object({
  title: z.string(),
  description: z.string(),
})

type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createTaskBodySchema)

@Controller('/tasks')
export class CreateTaskController {
  constructor(private createQuestion: CreateTaskUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateTaskBodySchema,
  ) {
    const { title, description } = body
    const userId = user.sub

    try {
      const { task } = await this.createQuestion.execute({
        authorId: userId,
        description,
        title,
      })

      return { task: TaskPresenter.toHTTP(task) }
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error.message)
    }
  }
}
