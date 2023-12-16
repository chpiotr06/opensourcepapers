import { NextResponse, type NextRequest } from 'next/server'
import type { ReviewToAdd } from '@/api/types/api.AddReview'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export async function POST(req: NextRequest) {
  const supabase = createRouteSupa()
  const body = (await req.json()) as ReviewToAdd

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

  const { data, error } = await supabase.from('reviews').insert([
    {
      title: body.title,
      author: body.author,
      co_authors: body.coAuthors,
      description: body.description,
      uploader_id: userData.user.id,
      review_url: body.reviewUrl,
      article_id: body.articleId,
    },
  ])

  if (error) {
    return NextResponse.json({ message: error }, { status: 400 })
  }

  return NextResponse.json({ data })
}
