import { NextResponse, type NextRequest } from 'next/server'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export async function POST(req: NextRequest) {
  const supabase = createRouteSupa()
  const body = await req.json()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  })

  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
