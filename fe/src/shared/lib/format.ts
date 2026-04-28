const DATETIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export function formatDatetime(value: number | Date): string {
  const date = typeof value === 'number' ? new Date(value) : value
  return DATETIME_FORMATTER.format(date)
}

export const formatNumber = (value: number) => Math.round(value).toLocaleString()

export const formatSignedNumber = (value: number) => {
  const rounded = Math.round(value)
  return `${rounded >= 0 ? '+' : ''}${rounded.toLocaleString()}`
}

export const formatDecimal = (value: number, digits = 4) => value.toFixed(digits)
