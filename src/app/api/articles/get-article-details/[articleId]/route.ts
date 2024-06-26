import { NextResponse } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export async function GET(request: Request, { params }: { params: { articleId: string } }) {
  const articleId = params.articleId
  const supabase = createRouteSupa()

  const { data, error } = await supabase
    .from('articles')
    .select(
      'created_at, title, author, co_authors, discipline, short_desc, abstract, article_url, article_no_personal_url, image_url, id, is_reviewed'
    )
    .eq('id', articleId)

  if (error) return NextResponse.json({ message: error }, { status: 500 })
  if (data?.length === 0) return NextResponse.json({ message: 'No articles found' }, { status: 404 })

  if (data[0].is_reviewed) {
    return NextResponse.json({ data })
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

  return NextResponse.json({ data: [{ ...data[0], author: null, co_authors: null }] })
}
