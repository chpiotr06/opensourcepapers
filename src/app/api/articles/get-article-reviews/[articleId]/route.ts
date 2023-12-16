import { NextResponse } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export async function GET(request: Request, { params }: { params: { articleId: string } }) {
  const articleId = params.articleId
  const supabase = createRouteSupa()

  const { data, error } = await supabase
    .from('reviews')
    .select('id, title, author, co_authors, description, review_url, created_at')
    .eq('article_id', articleId)

  if (error) return NextResponse.json({ message: error }, { status: 500 })
  if (data?.length === 0) return NextResponse.json({ message: 'No articles found' }, { status: 404 })

  return NextResponse.json({ data })
}
