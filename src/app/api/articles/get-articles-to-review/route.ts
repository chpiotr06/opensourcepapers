import { NextResponse } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createRouteSupa()
  const searchParams = request.nextUrl.searchParams
  const params = {
    title: searchParams.get('title'),
    discipline: searchParams.get('discipline'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- supabase internal runtime type
    orderBy: searchParams.get('order_by') as any,
    limit: searchParams.get('limit'),
  }

  const { data: userData } = await supabase.auth.getUser()

  if (!userData || !userData.user) {
    return NextResponse.json({ message: 'Resource not Found' }, { status: 404 })
  }
  const { data: validationData } = await supabase.from('profiles').select().eq('id', userData.user.id)

  if (!validationData) {
    return NextResponse.json({ message: 'Resource not Found' }, { status: 404 })
  }
  if (validationData[0].role != 'scientist' && validationData[0].role != 'admin') {
    return NextResponse.json({ message: 'Resource forbidden' }, { status: 403 })
  }

  const supabaseQuery = supabase
    .from('articles')
    .select('created_at, title, discipline, image_url, id')
    .order('created_at')

  if (params.title) supabaseQuery.ilike('title', `%${params.title}%`)
  if (params.discipline) supabaseQuery.ilike('discipline', `%${params.discipline}%`)
  supabaseQuery.is('is_reviewed', false)
  if (params.orderBy) {
    supabaseQuery.order(params.orderBy, { ascending: false })
  } else {
    supabaseQuery.order('created_at')
  }
  if (params.limit) supabaseQuery.limit(parseInt(params.limit))

  const { data, error } = await supabaseQuery

  if (error) return NextResponse.json({ message: error }, { status: 500 })
  if (data?.length === 0) return NextResponse.json({ message: 'No articles found' }, { status: 404 })

  return NextResponse.json({ data })
}
