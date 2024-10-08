import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

import { envSchema } from '@/env/env'

config({
  path: './.env',
  override: true,
})
config({
  path: './.env.test',
  override: true,
})

const env = envSchema.parse(process.env)

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required')
  }
  const url = new URL(env.DATABASE_URL)

  url.pathname = `/${schemaId}`

  return url.toString()
}

const DatabaseUUID = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(DatabaseUUID)
  process.env.DATABASE_URL = databaseURL

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS \`${DatabaseUUID}\`;`)

  await prisma.$disconnect()
})
