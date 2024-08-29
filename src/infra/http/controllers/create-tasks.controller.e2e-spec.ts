import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Create Task(e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  test('[POST] /task', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await hash('12345678', 8),
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/task')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Task title.',
        description: 'Task content.',
      })

    expect(response.status).toBe(201)

    const TaskListOnDatabase = await prisma.taskList.findFirst({
      where: { userId: user.id },
    })

    const taskOnDatabase = await prisma.task.findFirstOrThrow({
      where: {
        title: 'Task title.',
      },
    })

    expect(TaskListOnDatabase).toBeTruthy()
    expect(taskOnDatabase).toBeTruthy()

    await request(app.getHttpServer())
      .post('/task')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Task title.',
        description: 'Task content.',
      })

    const TaskListIncludesTasksOnDatabase = await prisma.taskList.findFirst({
      where: { userId: user.id },
      include: {
        tasks: true,
      },
    })

    expect(TaskListIncludesTasksOnDatabase.tasks.length).toBe(2)
  })
})
