import { makeTask } from 'test/factories/make-task'
import { makeTaskList } from 'test/factories/make-task-list'
import { InMemoryTasksListRepository } from 'test/repositories/in-memory-tasks-list-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { UpdateTaskUseCase } from './update-task'

let sut: UpdateTaskUseCase
let inMemoryTasksListRepository: InMemoryTasksListRepository

describe('Update an task', () => {
  beforeEach(() => {
    inMemoryTasksListRepository = new InMemoryTasksListRepository()
    sut = new UpdateTaskUseCase(inMemoryTasksListRepository)
  })
  it('should update a task', async () => {
    inMemoryTasksListRepository.items.push(
      makeTaskList({
        authorId: new UniqueEntityId('user-id'),
        tasks: [makeTask({}, new UniqueEntityId('task-id'))],
      }),
    )

    await sut.execute({
      authorId: 'user-id',
      taskId: 'task-id',
      description: 'Task description',
      title: 'Task title',
    })

    expect(inMemoryTasksListRepository.items[0].tasks.length).toEqual(1)
    expect(inMemoryTasksListRepository.items[0].tasks[0]).toEqual({
      _id: new UniqueEntityId('task-id'),
      props: {
        title: 'Task title',
        description: 'Task description',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    })
  })
  it('not should be able update an task when TaskList not exist', async () => {
    expect(
      sut.execute({
        authorId: 'user-id',
        taskId: 'task-id',
        description: 'Task description',
        title: 'Task title',
      }),
    ).rejects.toThrowError(new ResourceNotFoundError())
  })
  it('not should be able update an task when Task not exist', async () => {
    inMemoryTasksListRepository.items.push(
      makeTaskList({
        authorId: new UniqueEntityId('user-id'),
      }),
    )

    expect(
      sut.execute({
        authorId: 'user-id',
        taskId: 'task-id',
        description: 'Task description',
        title: 'Task title',
      }),
    ).rejects.toThrowError(new ResourceNotFoundError())
  })
})
