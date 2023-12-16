import { NextResponse } from 'next/server'
import type { UserData } from '@/api/types/api.Register'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createRouteSupa()
  const body = (await req.json()) as UserData

  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      data: {
        name: body.name,
        surname: body.surname,
      },
    },
  })

  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
