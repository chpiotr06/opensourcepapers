export const buildFilters = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- supabase internal runtime type
  supabaseQuery: any,
  searchParams: URLSearchParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- supabase internal runtime type
  buildEntry: (key: string, value: string, supabaseQuery: any) => void
) => {
  const entries = searchParams.entries()
  for (const [key, value] of entries) {
    buildEntry(key, value, supabaseQuery)
  }
}
