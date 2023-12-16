import type { ArticleShort } from '@/api/types/api.Articles'
import { ArticleThumbnail } from '@/components/features/article-thumbnail/article-thumbnail'

export const ArticlesGrid = ({ articles }: { articles: ArticleShort[] | null | undefined }) => (
  <div className='flex flex-wrap gap-4'>
    {articles?.map((article) => <ArticleThumbnail key={article.id} article={article} />)}
  </div>
)
