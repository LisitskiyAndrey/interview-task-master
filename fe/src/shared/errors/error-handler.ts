import { logger } from '@/shared/lib/logger'
import type { AppError } from './app-error'

export function handleError(error: AppError, context?: string): void {
  const prefix = context ? `[${context}] ` : ''
  logger.error(`${prefix}${error.code}: ${error.message}`, error)
}
