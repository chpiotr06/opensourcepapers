import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data, error } = await supabase.auth.signUp({
    email: 'piotrchmielowiec.tbg.70@gmail.com',
    password: 'Letplaywot123',
    options: {
      data: {
        name: 'Piotr',
        surname: 'Chmielowiec',
      },
    },
  })

  console.log(data, error)

  return NextResponse.json({})
}
