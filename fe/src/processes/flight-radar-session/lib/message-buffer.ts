export type MessageBuffer<T> = {
  push: (value: T) => void
  flush: () => T | null
  clear: () => void
}

export function createMessageBuffer<T>(): MessageBuffer<T> {
  let pending: T | null = null

  return {
    push: (value) => {
      pending = value
    },
    flush: () => {
      const value = pending
      pending = null
      return value
    },
    clear: () => {
      pending = null
    },
  }
}
