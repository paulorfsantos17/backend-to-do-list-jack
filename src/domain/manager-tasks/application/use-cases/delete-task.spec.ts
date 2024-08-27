import { makeTask } from 'test/factories/make-task'
import { makeTaskList } from 'test/factories/make-task-list'
import { InMemoryTasksListRepository } from 'test/repositories/in-memory-tasks-list-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { DeleteTaskUseCase } from './delete-task'

let sut: DeleteTaskUseCase
let inMemoryTasksListRepository: InMemoryTasksListRepository

describe('Delete an task', () => {
  beforeEach(() => {
    inMemoryTasksListRepository = new InMemoryTasksListRepository()
    sut = new DeleteTaskUseCase(inMemoryTasksListRepository)
  })
  it('should delete a task', async () => {
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

    expect(inMemoryTasksListRepository.items[0].tasks.length).toEqual(0)
  })

  it('not should be able delete an task when TaskList not exist', async () => {
    expect(
      sut.execute({
        authorId: 'user-id',
        taskId: 'task-id',
      }),
    ).rejects.toThrowError(new ResourceNotFoundError())
  })
  it('not should be able delete an task when Task not exist', async () => {
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
