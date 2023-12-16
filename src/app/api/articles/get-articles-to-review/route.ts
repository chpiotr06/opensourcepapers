import { NextResponse } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export async function GET() {
  const supabase = createRouteSupa()

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

  const { data, error } = await supabase
    .from('articles')
    .select('created_at, title, discipline, image_url, id')
    .is('is_reviewed', false)
    .order('created_at')

  if (error) return NextResponse.json({ message: error }, { status: 500 })
  if (data?.length === 0) return NextResponse.json({ message: 'No articles found' }, { status: 404 })

  return NextResponse.json({ data })
}
