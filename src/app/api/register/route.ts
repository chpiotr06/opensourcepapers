import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { UserData } from '@/api/types/api.Register'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
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
