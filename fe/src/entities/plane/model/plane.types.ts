import type { z } from 'zod'
import type {
  airportSchema,
  planeBasicSchema,
  planeDetailedSchema,
  planeStatusSchema,
} from '../schema/plane.schema'

export type PlaneStatus = z.infer<typeof planeStatusSchema>
export type Airport = z.infer<typeof airportSchema>
export type PlaneBasic = z.infer<typeof planeBasicSchema>
export type PlaneDetailed = z.infer<typeof planeDetailedSchema>
