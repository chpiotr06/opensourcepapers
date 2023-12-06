import { NextResponse } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export async function GET() {
  const supabase = createRouteSupa()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData || !userData.user) {
    return NextResponse.json({ mail: null, role: null })
  }
  const { data: validationData } = await supabase.from('profiles').select().eq('id', userData.user.id)

  if (!validationData) {
    return NextResponse.json({ message: 'Error. No user with specified id' }, { status: 500 })
  }

  return NextResponse.json({ mail: userData.user.email, role: validationData[0].role })
}
