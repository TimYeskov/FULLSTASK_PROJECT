import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Ensure DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables')
}

const prismaClientSingleton = () => {
  // Get DATABASE_URL from environment
  const databaseUrl = process.env.DATABASE_URL!
  
  console.log('[Prisma] Initializing PrismaClient with adapter...')
  console.log('[Prisma] DATABASE_URL available:', !!databaseUrl)
  console.log('[Prisma] DATABASE_URL length:', databaseUrl?.length || 0)
  
  if (!databaseUrl) {
    console.error('[Prisma] DATABASE_URL is not set in environment variables')
    console.error('[Prisma] Available env vars:', Object.keys(process.env).filter(k => k.includes('DATABASE')))
    throw new Error('DATABASE_URL is not set in environment variables')
  }
  
  // Create Prisma adapter for PostgreSQL
  const adapter = new PrismaPg({
    connectionString: databaseUrl,
  })
  
  // Create Prisma Client with adapter (required in Prisma 7+)
  try {
    const client = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    })
    console.log('[Prisma] PrismaClient created successfully with adapter')
    return client
  } catch (error) {
    console.error('[Prisma] Error creating PrismaClient:', error)
    throw error
  }
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const getPrisma = () => {
  if (process.env.NODE_ENV === 'production') {
    return prismaClientSingleton()
  }
  
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = prismaClientSingleton()
  }
  
  return globalThis.prismaGlobal
}

const prisma = getPrisma()

export default prisma