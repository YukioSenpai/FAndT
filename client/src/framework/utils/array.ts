export function orderAlphabeticallyByKey<T extends Record<K, string>, K extends PropertyKey>(
  array: T[] | undefined,
  key: K
) {
  if (!array) return

  return [...array].sort((a, b) => {
    return a[key].toUpperCase().localeCompare(b[key]?.toUpperCase()?.trim() || '')
  })
}
