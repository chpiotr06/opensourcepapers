import { NextResponse } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export async function GET() {
  const supabase = createRouteSupa()

  const { data, error } = await supabase
    .from('articles')
    .select('created_at, title, author, co_authors, discipline, image_url, id')
    .is('is_reviewed', true)

  if (error) return NextResponse.json({ message: error }, { status: 500 })
  if (data?.length === 0) return NextResponse.json({ message: 'No articles found' }, { status: 404 })

  return NextResponse.json({ data })
}
