import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { EnvModule } from '@/env/env.module'
import { EnvService } from '@/env/env.service'

import { JWtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './jwt-auth.guard'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(envService: EnvService) {
        const secretKey = envService.get('JWT_SECRET_KEY')

        return {
          signOptions: { algorithm: 'HS256' },
          secret: secretKey,
        }
      },
    }),
  ],
  providers: [
    JWtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    EnvService,
  ],
})
export class AuthModule {}
