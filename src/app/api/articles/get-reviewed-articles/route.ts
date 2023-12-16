import { NextResponse } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'
import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- supabase internal runtime type
const buildEntry = (key: string, value: string, supabaseQuery: any) => {
  switch (key) {
    case 'order_by':
      supabaseQuery.order(value, { ascending: false })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- supabase internal runtime type
const buildFilters = (supabaseQuery: any, searchParams: URLSearchParams) => {
  const entries = searchParams.entries()
  for (const [key, value] of entries) {
    buildEntry(key, value, supabaseQuery)
  }
}

export async function GET(request: NextRequest) {
  const supabase = createRouteSupa()
  const searchParams = request.nextUrl.searchParams

  const supabaseQuery = supabase
    .from('articles')
    .select('created_at, title, author, co_authors, discipline, image_url, id')
    .is('is_reviewed', true)

  buildFilters(supabaseQuery, searchParams)

  const { data, error } = await supabaseQuery

  if (error) return NextResponse.json({ message: error }, { status: 500 })
  if (data?.length === 0) return NextResponse.json({ message: 'No articles found' }, { status: 404 })

  return NextResponse.json({ data })
}
