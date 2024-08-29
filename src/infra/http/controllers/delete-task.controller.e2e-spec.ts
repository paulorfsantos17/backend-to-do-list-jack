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

describe('Delete Tasks (e2e)', () => {
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
  test('[Delete] /tasks:id', async () => {
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

    const taskList = await taskListFactory.makePrismaTaskList({
      authorId: new UniqueEntityId(user.id),
      createdAt: new Date(),
      updatedAt: null,
      tasks: [taskOne, taskTwo],
    })

    const response = await request(app.getHttpServer())
      .delete(`/tasks/${taskOne.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(200)

    const taskOnDatabase = await prisma.task.findFirst({
      where: {
        id: taskOne.id.toString(),
      },
    })

    const taskListOnDatabase = await prisma.taskList.findFirstOrThrow({
      where: {
        id: taskList.id.toString(),
      },
      include: {
        tasks: true,
      },
    })

    expect(taskOnDatabase).toBeNull()
    expect(taskListOnDatabase.tasks.length).toBe(1)
  })
})
