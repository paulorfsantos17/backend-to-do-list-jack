import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'

import { User } from '../../enterprise/user'
import { AuthenticatedUserUseCase } from './authenticate-user'

let sut: AuthenticatedUserUseCase
let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

describe('Authenticated an user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticatedUserUseCase(
      inMemoryUserRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })
  it('should authenticated a user', async () => {
    inMemoryUserRepository.items.push(
      User.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await fakeHasher.hash('password'),
      }),
    )

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: 'password',
    })

    expect(result.accessToken).toBeTruthy()
    expect(result).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('not should ne able authenticated a user when user not exist', async () => {
    expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: 'password',
      }),
    ).rejects.toThrowError('Credentials are not valid')
  })

  it('not should ne able authenticated a user when password not equals', async () => {
    inMemoryUserRepository.items.push(
      User.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await fakeHasher.hash('password123'),
      }),
    )

    expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: 'password',
      }),
    ).rejects.toThrowError('Credentials are not valid')
  })
})
