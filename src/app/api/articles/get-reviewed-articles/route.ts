import { NextResponse } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createRouteSupa()
  const searchParams = request.nextUrl.searchParams
  const params = {
    title: searchParams.get('title'),
    author: searchParams.get('author'),
    coAuthors: searchParams.get('co_authors'),
    discipline: searchParams.get('discipline'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- supabase internal runtime type
    orderBy: searchParams.get('order_by') as any,
    limit: searchParams.get('limit'),
  }

  const supabaseQuery = supabase
    .from('articles')
    .select('created_at, title, author, co_authors, discipline, image_url, id')

  if (params.title) supabaseQuery.ilike('title', `%${params.title}%`)
  if (params.author) supabaseQuery.ilike('author', `%${params.author}%`)
  if (params.coAuthors) supabaseQuery.ilike('co_authors', `%${params.coAuthors}%`)
  if (params.discipline) supabaseQuery.ilike('discipline', `%${params.discipline}%`)
  supabaseQuery.is('is_reviewed', true)
  if (params.orderBy) supabaseQuery.order(params.orderBy, { ascending: false })
  if (params.limit) supabaseQuery.limit(parseInt(params.limit))

  const { data, error } = await supabaseQuery

  if (error) return NextResponse.json({ message: error }, { status: 500 })
  if (data?.length === 0) return NextResponse.json({ message: 'No articles found' }, { status: 404 })

  return NextResponse.json({ data })
}
