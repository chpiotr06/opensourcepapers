export const filesizeSuffix = (size: number) => {
  if (size < 1_000) return `${size} B`
  if (size < 1_000_000) return `${Math.round(size / 1_000)} KB`
  if (size < 1_000_000_000) return `${Math.round(size / 1_000_000)} MB`
  return `${Math.round(size / 1_000_000_000)} GB`
}
