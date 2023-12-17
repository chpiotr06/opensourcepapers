'use client'

import { ArticlesFilters } from '@/components/features/articles-page/articles-filters'
import { ArticlesList } from '@/components/features/articles-page/articles-list'

export const ArticlesPage = () => (
  <div className='flex gap-10'>
    <ArticlesFilters />
    <ArticlesList />
  </div>
)
