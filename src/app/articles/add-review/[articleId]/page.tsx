import { redirect } from 'next/navigation'
import { ReviewForm } from '@/components/features/add-review/review-form'
import { Typography } from '@/components/ui/typography'
import { appRouting } from '@/lib/app-routing'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export default async function AddReviewPage({ params }: { params: { articleId: string } }) {
  //ensure that user who wants to access admin page is indeed admin
  const supabase = createRouteSupa()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData || !userData.user) redirect(appRouting.articles.default)
  const { data: validationData } = await supabase.from('profiles').select().eq('id', userData.user.id)
  if (!validationData) redirect(appRouting.articles.default)
  if (validationData[0].role !== 'admin' && validationData[0].role !== 'scientist')
    redirect(appRouting.articles.default)

  return (
    <div className='mx-6 pt-14'>
      <Typography variant='h1-30-500' className='my-6'>
        Dodaj Recenzję
      </Typography>
      <ReviewForm articleId={params.articleId} />
    </div>
  )
}
