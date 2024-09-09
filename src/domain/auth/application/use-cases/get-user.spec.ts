import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { User } from '@/domain/auth/enterprise/user'

import { GetUserUseCase } from './get-user'

let sut: GetUserUseCase
let inMemoryUserRepository: InMemoryUserRepository

describe('get User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new GetUserUseCase(inMemoryUserRepository)
  })

  it('should get a user by id', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    })

    inMemoryUserRepository.items.push(user)
    const result = await sut.execute({
      id: user.id.toString(),
    })

    expect(result.user).toEqual(inMemoryUserRepository.items[0])
  })

  it('not be able should get user when not exist user', async () => {
    expect(
      sut.execute({
        id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
