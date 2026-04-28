export type FlushScheduler = {
  start: () => void
  stop: () => void
}

export function createFlushScheduler(intervalMs: number, onFlush: () => void): FlushScheduler {
  let timer: ReturnType<typeof setInterval> | null = null

  return {
    start() {
      if (timer !== null) return
      timer = setInterval(onFlush, intervalMs)
    },
    stop() {
      if (timer === null) return
      clearInterval(timer)
      timer = null
    },
  }
}
