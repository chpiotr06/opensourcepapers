import { NextResponse } from 'next/server'
import type { ScientificUserData } from '@/api/types/api.ScientificRegister'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createRouteSupa()
  const body = (await req.json()) as ScientificUserData

  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      data: {
        name: body.name,
        surname: body.surname,
        institution: body.institution,
        degree: body.degree,
        scientific_discipline: body.scientific_discipline,
      },
    },
  })

  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
