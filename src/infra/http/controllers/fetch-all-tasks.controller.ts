import { BadRequestException, Controller, Get } from '@nestjs/common'

import { FetchAllTasksUseCase } from '@/domain/manager-tasks/application/use-cases/fetch-all-tasks'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { TaskPresenter } from '../presenters/task-presenter'

@Controller('/tasks')
export class FetchAllTasksController {
  constructor(private fetchQuestionCommentsUseCase: FetchAllTasksUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub
    try {
      const { tasks } = await this.fetchQuestionCommentsUseCase.execute({
        authorId: userId,
      })

      return {
        tasks: tasks.map(TaskPresenter.toHTTP),
      }
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error.message)
    }
  }
}
