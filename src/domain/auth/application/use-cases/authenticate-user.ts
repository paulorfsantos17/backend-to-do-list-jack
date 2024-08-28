import { Injectable } from '@nestjs/common'

import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { UsersRepository } from '../repositories/users-repository'
import { WrongCredentialsError } from './erros/wrong-credentials-error'

interface AuthenticatedUserUseCaseRequest {
  email: string
  password: string
}
interface AuthenticatedUserUseCaseResponse {
  accessToken: string
}

@Injectable()
export class AuthenticatedUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashCompare: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticatedUserUseCaseRequest): Promise<AuthenticatedUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new WrongCredentialsError()
    }

    const hashedPassword = await this.hashCompare.compare(
      password,
      user.password,
    )

    if (!hashedPassword) {
      throw new WrongCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return {
      accessToken,
    }
  }
}
