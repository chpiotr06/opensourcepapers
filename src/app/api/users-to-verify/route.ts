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
  if (validationData[0].role != 'admin') {
    return NextResponse.json({ message: 'Resource forbidden' }, { status: 403 })
  }

  const { data } = await supabase
    .from('profiles')
    .select('id, name, surname, scientific_profiles(degree, institution, scientific_discipline)')
    .not('scientific_profile_id', 'is', null)
    .eq('scientific_profiles.is_verified', false)

  return NextResponse.json({ data })
}
