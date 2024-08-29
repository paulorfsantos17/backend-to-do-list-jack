import { makeTask } from 'test/factories/make-task'
import { makeTaskList } from 'test/factories/make-task-list'
import { InMemoryTasksListRepository } from 'test/repositories/in-memory-tasks-list-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { CompletedTaskUseCase } from './completed-task'

let sut: CompletedTaskUseCase
let inMemoryTasksListRepository: InMemoryTasksListRepository

describe('Completed an task', () => {
  beforeEach(() => {
    inMemoryTasksListRepository = new InMemoryTasksListRepository()
    sut = new CompletedTaskUseCase(inMemoryTasksListRepository)
  })
  it('should completed a task', async () => {
    inMemoryTasksListRepository.items.push(
      makeTaskList({
        authorId: new UniqueEntityId('user-id'),
        tasks: [makeTask({}, new UniqueEntityId('task-id'))],
      }),
    )

    await sut.execute({
      authorId: 'user-id',
      taskId: 'task-id',
    })

    expect(
      inMemoryTasksListRepository.items[0].tasks[0].completionDate,
    ).toBeTruthy()
    expect(
      inMemoryTasksListRepository.items[0].tasks[0].completionDate,
    ).toEqual(expect.any(Date))
  })

  it('not should be able Completed an task when TaskList not exist', async () => {
    expect(
      sut.execute({
        authorId: 'user-id',
        taskId: 'task-id',
      }),
    ).rejects.toThrowError(new ResourceNotFoundError())
  })
  it('not should be able Completed an task when Task not exist', async () => {
    inMemoryTasksListRepository.items.push(
      makeTaskList({
        authorId: new UniqueEntityId('user-id'),
      }),
    )

    expect(
      sut.execute({
        authorId: 'user-id',
        taskId: 'task-id',
      }),
    ).rejects.toThrowError(new ResourceNotFoundError())
  })
})
