import { ArticleForm } from '@/components/features/add-article/article-form'
import { Typography } from '@/components/ui/typography'

export default function AddArticlePage() {
  return (
    <div className='mx-6 mb-6'>
      <Typography variant='h1-30-500' className='my-6'>
        Dodaj Pracę
      </Typography>
      <ArticleForm />
    </div>
  )
}
