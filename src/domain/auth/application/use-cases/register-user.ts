import { User } from '../../enterprise/user'
import type { HashGenerator } from '../cryptography/hash-generator'
import type { UsersRepository } from '../repositories/users-repository'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<void> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('User already exists')
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({ name, email, password: hashedPassword })
    await this.usersRepository.create(user)
  }
}
