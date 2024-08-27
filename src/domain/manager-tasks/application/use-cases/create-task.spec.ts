import { InMemoryTasksListRepository } from 'test/repositories/in-memory-tasks-list-repository'

import { CreateTaskUseCase } from './create-task'

let sut: CreateTaskUseCase
let inMemoryTasksListRepository: InMemoryTasksListRepository

describe('create an task', () => {
  beforeEach(() => {
    inMemoryTasksListRepository = new InMemoryTasksListRepository()
    sut = new CreateTaskUseCase(inMemoryTasksListRepository)
  })
  it('should create a new  task', async () => {
    await sut.execute({
      authorId: 'user-id',
      description: 'Task description',
      title: 'Task title',
    })

    expect(inMemoryTasksListRepository.items[0].tasks.length).toEqual(1)
    expect(inMemoryTasksListRepository.items[0].tasks[0].id).toBeTruthy()
  })

  it('should create a new  taskList', async () => {
    await sut.execute({
      authorId: 'user-id',
      description: 'Task description',
      title: 'Task title',
    })

    expect(inMemoryTasksListRepository.items.length).toEqual(1)
    expect(inMemoryTasksListRepository.items[0].id).toBeTruthy()
  })
})
