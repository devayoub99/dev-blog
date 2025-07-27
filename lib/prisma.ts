// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // This prevents Next.js from creating multiple instances during development
  var __prisma: PrismaClient | undefined
}

// Check if we're in a development environment and reuse the connection
const prisma = globalThis.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma
}

export { prisma }
