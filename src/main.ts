import { NestFactory } from '@nestjs/core'
import * as cors from 'cors'

import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: 'GET,POST,PUT,DELETE,PATCH',
      allowedHeaders: 'Content-Type,Authorization',
    }),
  )
  const envService = app.get(EnvService)
  const port = envService.get('PORT')
  await app.listen(port)
}
bootstrap()
