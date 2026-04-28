import { AppError } from './app-error'

export class WsError extends AppError {
  readonly closeCode: number | null

  constructor(message: string, closeCode: number | null = null, options?: ErrorOptions) {
    super('WS_ERROR', message, options)
    this.name = 'WsError'
    this.closeCode = closeCode
  }
}
