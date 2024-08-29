import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { makeTask } from 'test/factories/make-task'
import { TaskListFactory } from 'test/factories/make-task-list'

import { AppModule } from '@/app.module'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Fetch All Tasks (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let taskListFactory: TaskListFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService, TaskListFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    taskListFactory = moduleRef.get(TaskListFactory)

    await app.init()
  })
  test('[GET] /tasks', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await hash('12345678', 8),
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const taskOne = makeTask({
      title: 'Task 1',
      description: 'Task 1 description',
    })
    const taskTwo = makeTask({
      title: 'Task 2',
      description: 'Task 2 description',
    })

    await taskListFactory.makePrismaTaskList({
      authorId: new UniqueEntityId(user.id),
      createdAt: new Date(),
      updatedAt: null,
      tasks: [taskOne, taskTwo],
    })

    const response = await request(app.getHttpServer())
      .put(`/tasks/${taskOne.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Task 1 updated',
        description: 'Task 1 updated description',
      })

    expect(response.status).toBe(200)

    const taskOnDatabase = await prisma.task.findFirstOrThrow({
      where: {
        id: taskOne.id.toString(),
      },
    })

    expect(taskOnDatabase.title).toBe('Task 1 updated')
    expect(taskOnDatabase.description).toBe('Task 1 updated description')
  })
})
