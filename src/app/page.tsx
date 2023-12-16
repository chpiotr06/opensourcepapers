import { MainPage } from '@/components/features/main-page/main-page'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export default async function Home() {
  const supabase = createRouteSupa()
  const { data: userData } = await supabase.auth.getUser()
  const { data: validationData } = await supabase
    .from('profiles')
    .select()
    .eq('id', userData && userData.user && userData.user.id ? userData.user.id : '')

  return (
    <main className='mx-6 py-16'>
      <MainPage
        canSeeToReview={
          validationData ? validationData[0].role === 'scientist' || validationData[0].role === 'admin' : false
        }
      />
    </main>
  )
}
