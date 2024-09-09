import { Injectable } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { User } from '../../enterprise/user'
import { UsersRepository } from '../repositories/users-repository'

interface GetUserUseCaseRequest {
  id: string
}
interface RegisterUserUseCaseResponse {
  user: User
}

@Injectable()
export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)
    const userExist = !user

    if (userExist) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
