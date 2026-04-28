import { z } from 'zod'

export const planeStatusSchema = z.enum(['departed', 'enroute', 'cruising', 'landing'])

export const planeBasicSchema = z.object({
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number(),
  color: z.string(),
})

export const airportSchema = z.object({
  airport: z.string(),
  city: z.string(),
})

export const planeDetailedSchema = z.object({
  id: z.string(),
  model: z.string(),
  airline: z.string(),
  flightNumber: z.string(),
  registration: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number(),
  speed: z.number(),
  heading: z.number(),
  verticalSpeed: z.number(),
  origin: airportSchema,
  destination: airportSchema,
  flightDuration: z.number(),
  estimatedArrival: z.number(),
  numberOfPassengers: z.number(),
  maxPassengers: z.number(),
  status: planeStatusSchema,
  color: z.string(),
})

export const wsPlanesMessageSchema = z.object({
  type: z.literal('planes'),
  data: z.array(planeBasicSchema),
})

export const wsPlaneDetailsMessageSchema = z.object({
  type: z.literal('plane-details'),
  data: planeDetailedSchema,
})

export const wsErrorMessageSchema = z.object({
  type: z.literal('error'),
  message: z.string(),
})

export const wsMessageSchema = z.discriminatedUnion('type', [
  wsPlanesMessageSchema,
  wsPlaneDetailsMessageSchema,
  wsErrorMessageSchema,
])
