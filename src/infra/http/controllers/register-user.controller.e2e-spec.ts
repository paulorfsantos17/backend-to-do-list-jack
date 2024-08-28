import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Create account(e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })
  test('[POST] /register', async () => {
    const response = await request(app.getHttpServer()).post('/register').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '12345678',
    })

    expect(response.status).toBe(201)

    const userOnDataBase = await prisma.user.findUnique({
      where: { email: 'john.doe@example.com' },
    })

    expect(userOnDataBase).toBeTruthy()
  })
})
