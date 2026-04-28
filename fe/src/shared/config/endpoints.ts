import { env } from './env'

export const endpoints = {
  ws: {
    planesBasic: `${env.wsBaseUrl}/ws/planes/basic`,
    planesDetails: `${env.wsBaseUrl}/ws/planes/details`,
  },
} as const
