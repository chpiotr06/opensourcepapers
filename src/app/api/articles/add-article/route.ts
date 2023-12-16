import { NextResponse, type NextRequest } from 'next/server'
import type { ArticleToAdd } from '@/api/types/api.AddArticle'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export async function POST(req: NextRequest) {
  const supabase = createRouteSupa()
  const body = (await req.json()) as ArticleToAdd

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

  const { data, error } = await supabase.from('articles').insert([
    {
      title: body.title,
      author: body.author,
      co_authors: body.coAuthors,
      discipline: body.discipline,
      short_desc: body.shortDesc,
      abstract: body.abstract,
      uploader_id: userData.user.id,
      article_url: body.articleUrl,
      article_no_personal_url: body.articleNoPersonalUrl,
      image_url: body.imageUrl,
    },
  ])

  if (error) {
    return NextResponse.json({ message: error }, { status: 400 })
  }

  return NextResponse.json({ data })
}
