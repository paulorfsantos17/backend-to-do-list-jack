import { makeTask } from 'test/factories/make-task'
import { InMemoryTasksListRepository } from 'test/repositories/in-memory-tasks-list-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { TaskList } from '../enterprise/task-list'
import { FetchAllTasksUseCase } from './fetch-all-tasks'

let sut: FetchAllTasksUseCase
let inMemoryTasksListRepository: InMemoryTasksListRepository

describe('Fetch All Tasks', () => {
  beforeEach(() => {
    inMemoryTasksListRepository = new InMemoryTasksListRepository()
    sut = new FetchAllTasksUseCase(inMemoryTasksListRepository)
  })
  it('should be able to fetch tasks', async () => {
    const taskList = TaskList.create({
      authorId: new UniqueEntityId('user-id'),
      tasks: [],
      createdAt: new Date(),
      updatedAt: null,
    })

    inMemoryTasksListRepository.items.push(taskList)

    const task1 = makeTask({
      title: 'Task 1',
      description: 'Task 1 description',
    })
    const task2 = makeTask()

    taskList.addTask(task1)
    taskList.addTask(task2)

    for (let i = 0; i < 8; i++) {
      taskList.addTask(makeTask())
    }

    const result = await sut.execute({
      authorId: 'user-id',
    })

    expect(result.tasks.length).toEqual(10)
    expect(result.tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: task1.id,
          props: {
            title: 'Task 1',
            description: 'Task 1 description',
            createdAt: expect.any(Date),
          },
        }),
        expect.objectContaining({
          id: task2.id,
        }),
      ]),
    )
  })
  it('should be able to fetch tasks', async () => {
    const result = await sut.execute({
      authorId: 'user-id',
    })

    expect(result).toEqual(null)
  })
})
