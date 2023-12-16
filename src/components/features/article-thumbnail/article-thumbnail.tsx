import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import type { ArticleShort } from '@/api/types/api.Articles'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/ui/typography'
import { appRouting } from '@/lib/app-routing'

export const ArticleThumbnail = ({ article }: { article: ArticleShort }) => (
  <Link href={appRouting.articles.slug(article.id)} className='flex items-stretch'>
    <div key={article.id} className='flex w-[300px] max-w-[300px] flex-col gap-1 rounded-sm bg-secondary p-2'>
      <AspectRatio ratio={16 / 9} className='overflow-hidden rounded-sm'>
        <Image src={article.image_url} alt={article.image_url} width={300} height={300 / 9} />
      </AspectRatio>
      <Typography variant='p-14-500' className='text-lg'>
        {article.title}
      </Typography>
      <Separator className='bg-background' />
      <Typography variant='p-14-500'>{article.discipline}</Typography>
      <Typography variant='p-14-500'>{article.author}</Typography>
      {article.co_authors && <Typography className='max-w-[300px] text-ellipsis'>{article.co_authors}</Typography>}
      <Typography>{format(new Date(article.created_at), 'dd MMMM yyyy', { locale: pl })}</Typography>
    </div>
  </Link>
)
