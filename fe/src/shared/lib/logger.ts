type Logger = {
  debug: (...args: unknown[]) => void
  info: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
}

const prefix = '[radar]'

export const logger: Logger = import.meta.env.DEV
  ? {
      debug: (...args) => console.debug(prefix, ...args),
      info: (...args) => console.info(prefix, ...args),
      warn: (...args) => console.warn(prefix, ...args),
      error: (...args) => console.error(prefix, ...args),
    }
  : {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    }
