import { NextResponse } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export async function POST(request: Request, { params }: { params: { user: string } }) {
  const userId = params.user
  const supabase = createRouteSupa()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData || !userData.user) {
    return NextResponse.json({ message: 'Resource not Found' }, { status: 404 })
  }
  const { data: validationData } = await supabase.from('profiles').select().eq('id', userData.user.id)

  if (!validationData) {
    return NextResponse.json({ message: 'Resource not Found' }, { status: 404 })
  }
  if (validationData[0].role !== 'admin') {
    return NextResponse.json({ message: 'Resource forbidden' }, { status: 403 })
  }

  const { data: spUserData, error: spError } = await supabase.from('scientific_profiles').select().eq('id', userId)

  if (spError) return NextResponse.json({ message: spError }, { status: 500 })

  const { data, error: errorOne } = await supabase
    .from('scientific_profiles')
    .update({ is_verified: true })
    .eq('id', userId)
    .select()
  if (errorOne) return NextResponse.json({ message: errorOne }, { status: 500 })

  const { error: errorTwo } = await supabase
    .from('profiles')
    .update({ role: 'scientist' })
    .eq('id', spUserData[0].profile_id)
    .select()
  if (errorTwo) return NextResponse.json({ message: errorTwo }, { status: 500 })

  return NextResponse.json({ data })
}
