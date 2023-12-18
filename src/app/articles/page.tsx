import { ArticlesPage } from '@/components/features/articles-page/articles-page'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export default async function ArticlesPageRoute() {
  const supabase = createRouteSupa()
  await supabase.auth.getUser()
  return (
    <div className='py-20'>
      <ArticlesPage />
    </div>
  )
}
