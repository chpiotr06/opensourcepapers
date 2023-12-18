import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export const ArticleSkeleton = () => (
  <div className='flex w-[300px] max-w-[300px] flex-col gap-1 rounded-sm bg-secondary p-2'>
    <AspectRatio ratio={16 / 9} className='overflow-hidden rounded-sm'>
      <Skeleton className='h-full w-full bg-background' />
    </AspectRatio>
    <Skeleton className='h-7 w-48 bg-background' />
    <Separator className='bg-background' />
    <Skeleton className='h-5 w-48 bg-background' />
    <Skeleton className='h-5 w-48 bg-background' />
    <Skeleton className='h-4 w-48 bg-background' />
    <Skeleton className='h-4 w-48 bg-background' />
  </div>
)
