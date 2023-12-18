import { ArticleSkeleton } from '@/components/features/article-thumbnail/article-skeleton'

export const ArticlesSkeletonGrid = () => (
  <div className='flex flex-wrap gap-4'>
    {Array.from({ length: 10 }, (_, index) => (
      <ArticleSkeleton key={index} />
    ))}
  </div>
)
