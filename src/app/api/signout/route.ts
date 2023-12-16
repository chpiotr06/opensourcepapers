import { NextResponse } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export async function POST() {
  const supabase = createRouteSupa()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  return NextResponse.json({}, { status: 201 })
}
