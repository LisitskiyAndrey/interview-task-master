import { AppError } from './app-error'

export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) return error
  if (error instanceof Error) return new AppError('UNKNOWN_ERROR', error.message, { cause: error })
  if (typeof error === 'string') return new AppError('UNKNOWN_ERROR', error)
  return new AppError('UNKNOWN_ERROR', 'An unknown error occurred')
}
