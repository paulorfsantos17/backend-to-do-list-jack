import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'

import { User } from '@/domain/auth/enterprise/user'

import { RegisterUserUseCase } from './register-user'

let sut: RegisterUserUseCase
let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher

describe('create an user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(inMemoryUserRepository, fakeHasher)
  })
  it('should register a new user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    })

    expect(inMemoryUserRepository.items.length).toEqual(1)
    expect(inMemoryUserRepository.items[0].id).toBeTruthy()
  })

  it('not should be able register a new user when exist email equal', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    })

    inMemoryUserRepository.items.push(user)

    expect(
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
      }),
    ).rejects.toThrowError('User already exists')
    expect(inMemoryUserRepository.items.length).toEqual(1)
  })

  it('should  hash user password upon registration', async () => {
    await sut.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: 'test123',
    })

    const hashedPassword = await fakeHasher.hash('test123')

    expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
  })
})
