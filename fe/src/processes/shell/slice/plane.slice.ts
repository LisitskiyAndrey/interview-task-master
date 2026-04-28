import type { AppState } from '@/processes/shell/store.types'
import type { StateCreator } from 'zustand'
import type { PlaneBasic, PlaneDetailed } from '../../../entities/plane/model/plane.types'

export type PlaneSliceState = {
  planes: PlaneBasic[]
  planesById: Record<string, PlaneBasic>
  selectedPlaneId: string | null
  planeDetailsById: Record<string, PlaneDetailed>
}

export type PlaneSliceActions = {
  setPlanes: (planes: PlaneBasic[]) => void
  selectPlane: (id: string) => void
  unselectPlane: () => void
  setPlaneDetails: (details: PlaneDetailed) => void
}

export type PlaneSlice = PlaneSliceState & PlaneSliceActions

export const selectPlanesList = (state: PlaneSliceState): PlaneBasic[] => state.planes

export const selectSelectedPlaneId = (state: PlaneSliceState): string | null =>
  state.selectedPlaneId

export const selectSelectedPlaneDetails = (state: PlaneSliceState): PlaneDetailed | null => {
  if (state.selectedPlaneId === null) return null
  return state.planeDetailsById[state.selectedPlaneId] ?? null
}

// — Slice creator

export const createPlaneSlice: StateCreator<AppState, [], [], PlaneSlice> = (set) => ({
  planes: [],
  planesById: {},
  selectedPlaneId: null,
  planeDetailsById: {},

  setPlanes: (planes) =>
    set({
      planes,
      planesById: Object.fromEntries(planes.map((p): [string, PlaneBasic] => [p.id, p])),
    }),

  selectPlane: (id) => set({ selectedPlaneId: id }),

  unselectPlane: () => set({ selectedPlaneId: null }),

  setPlaneDetails: (details) =>
    set((state) => ({
      planeDetailsById: { ...state.planeDetailsById, [details.id]: details },
    })),
})
