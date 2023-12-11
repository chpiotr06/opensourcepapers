import { redirect } from 'next/navigation'
import { ArticlesToReviewList } from '@/components/features/articles-to-review-list/articles-to-review-list'
import { appRouting } from '@/lib/app-routing'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export default async function ToReviewPage() {
  const supabase = createRouteSupa()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData || !userData.user) redirect(appRouting.articles.default)
  const { data: validationData } = await supabase.from('profiles').select().eq('id', userData.user.id)
  if (!validationData) redirect(appRouting.articles.default)
  if (validationData[0].role !== 'admin' && validationData[0].role !== 'scientist')
    redirect(appRouting.articles.default)

  return (
    <div>
      <ArticlesToReviewList />
    </div>
  )
}
