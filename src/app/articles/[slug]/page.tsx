import { ArticleDetails } from '@/components/features/article-details/article-details'
import { createRouteSupa } from '@/lib/supabase/routeHandlerClient'

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const supabase = createRouteSupa()
  const { data: userData } = await supabase.auth.getUser()
  const { data: validationData } = await supabase
    .from('profiles')
    .select()
    .eq('id', userData && userData.user && userData.user.id ? userData.user.id : '')

  await supabase.rpc('increment_article_views', { uid: params.slug })

  return (
    <div className='mx-6 py-20'>
      <ArticleDetails
        articleId={params.slug}
        canAddReview={
          validationData ? validationData[0].role === 'scientist' || validationData[0].role === 'admin' : false
        }
      />
    </div>
  )
}
