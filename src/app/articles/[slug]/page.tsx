import { ArticleDetails } from '@/components/features/article-details/article-details'

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <div className='pt-14'>
      <ArticleDetails articleId={params.slug} />
    </div>
  )
}
