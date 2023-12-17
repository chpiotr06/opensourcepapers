import { ArticlesToReviewFilters } from '@/components/features/articles-to-review-list/to-review-filters'
import { ArticlesToReviewList } from '@/components/features/articles-to-review-list/to-review-list'

export function ArticlesToReviewPage() {
  return (
    <div className='flex flex-col gap-10 sm:flex-row'>
      <ArticlesToReviewFilters />
      <ArticlesToReviewList />
    </div>
  )
}
